/**
 * Arg 1: access token with scope https://www.googleapis.com/auth/drive.file (avec same client id)
 * Arg 2: parent fodler in Drive (1vKwnOEPE7CoMGA4sB1Q6BzZE3i7w53J1)
 */
const {google} = require('googleapis');
const fs = require('fs'), path = require('path');
const md5File = require('md5-file')

const driveIndex = "driveIndex.json";

const access_token = process.argv[2];
const parentFolderId = process.argv[3];

const previousDriveIds = JSON.parse(fs.readFileSync(driveIndex));
const driveIds = {};

const OAuth2 = google.auth.OAuth2;
const auth = new OAuth2();
auth.setCredentials({access_token});
const drive = google.drive({version: 'v3', auth, retryConfig: {
    retryDelay: 1000,
    shouldRetry: err => {
        let response = err.response;
        return response.status === 403 
            && response.data.error.errors[0].reason === 'userRateLimitExceeded';
    }
}});

function walkDir(dir, dirCallback, fileCallback) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, {withFileTypes: true}, (err, dirEnts) => {
            resolve(Promise.all(dirEnts.map(dirEnt => {
                let name = dirEnt.name;
                let dirPath = path.join(dir, name);
                return dirEnt.isDirectory()
                    ? dirCallback(name, dirPath).then(() => walkDir(dirPath, dirCallback, fileCallback))
                    : fileCallback(name, dirPath);
            })))
        });
    });
}

function createDirectory(name, fullPath, drive) {
    let createFolder = () => drive.files.create({
        resource: {
            name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [driveIds[path.dirname(fullPath)] || parentFolderId]
        },
        supportsAllDrives: true,
        fields: 'id'
    }).then(res => {
        console.log(`Id of folder ${fullPath}: ${res.data.id}`);
        driveIds[fullPath] = res.data.id;
    }).catch(err => {
        console.log(`Cannot create folder ${fullPath}`, err);
        process.exit(1);
    });
    let previousId = previousDriveIds[fullPath];
    if (previousId) {
        return drive.files.get({
            fileId: previousId,
            fields: "id,mimeType,trashed,explicitlyTrashed",
            supportsAllDrives: true
        }).then(res => {
            let folder = res.data;
            if (folder.trashed || folder.explicitlyTrashed) {
                console.log(`Drive folder ${previousId} for ${fullPath} is trashed, recreating`);
                return createFolder();
            }
            console.log(`Reusing existing Drive folder ${previousId} for ${fullPath}`);
            driveIds[fullPath] = folder.id; 
        }).catch(err => {
            console.log(`Folder ${previousId} does not exist`, err)
            return createFolder();
        });
    }
    return createFolder();
}

function uploadFile(name, fullPath, drive) {
    let md5 = md5File.sync(fullPath);
    let createFile = () => drive.files.create({
        resource: {
            name, 
            mimeType: 'application/vnd.google-apps.document', 
            parents: [driveIds[path.dirname(fullPath)] || parentFolderId],
            properties: {md5}
        },
        supportsAllDrives: true,
        media: {
            mimeType: 'text/html',
            body: fs.createReadStream(fullPath)
        },
        fields: 'id'
    }).then(res => {
        console.log(`Id of file ${fullPath}: ${res.data.id}`);
        driveIds[fullPath] = res.data.id;
    }).catch(err => {
        console.log(`Cannot create file ${fullPath}`, err);
        process.exit(1);
    });
    let previousId = previousDriveIds[fullPath];
    if (previousId) {
        return drive.files.get({
            fileId: previousId,
            fields: "id,name,mimeType,trashed,explicitlyTrashed,properties",
            supportsAllDrives: true
        }).then(res => {
            let file = res.data;
            if (file.trashed || file.explicitlyTrashed) {
                console.log(`Drive file ${previousId} for ${fullPath} is trashed, recreating`);
                return createFile();
            }
            if (file.properties.md5 === md5) {
                console.log(`Reusing existing Drive file ${previousId} for ${fullPath}`);
                driveIds[fullPath] = file.id;
            } else {
                console.log(`Content of ${fullPath} changed, recreating a new file`);
                return drive.files.update({
                    fileId: previousId,
                    supportsAllDrives: true,
                    resource: {
                        name: `[OLD] ${file.name}`
                    }
                }).then(res => {
                    console.log(`Renamed old version of ${fullPath}`);
                    return createFile();
                }).catch(err => {
                    console.log(`Cannot rename file ${previousId}`, err);
                    process.exit(1);
                });
            }
        }).catch(err => {
            console.log(`File ${previousId} does not exist`, err)
            return createFile();
        });
    }
    return createFile();
}

walkDir('html/Guides',
    (name, path) => createDirectory(name, path, drive),
    (name, path) => uploadFile(name, path, drive))
    .then(() => {
        fs.writeFileSync(driveIndex, JSON.stringify(driveIds));
    });
