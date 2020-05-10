# Access APIs with Bearer tokens

> ⭑   Note: Unlike the out of the box security code solution, access and ID tokens require setting up a process on AODocs to whitelist client IDs.  This is not currently possible out of the box.

In general, a Bearer  token is a piece of data that acts as a permit to operate on resources, passed in the Authorization header of requests.

Two main types of Bearer tokens exist:

*   **JWT ID Tokens**: these tokens only convey the identity of the user, and are encoded strings in the JWT format
*   **OAuth 2.0 Access Token**: these tokens have authorization scopes associated with them, and can provide access to Google API resources, like Drive, Gmail, etc.

A user who has access to resources on a resource server tells the authorization server it's OK for the client app to have the same access.  The client app then gets a permit (token) it can present to the resource server with each request.

The main reason to use access or ID tokens (instead of security code) is to provide the client app with secure delegated access to server resources on your behalf.  It allows authorizing a client app to access and manipulate server resources within a specific scope/time, and without exposing the user's credentials to the app.


## AODocs API authentication flow

When a client app gets the user to authenticate, Google can generate two types of tokens:

*   an ID token (JWT) without any authorization scope (conveys only identity);
*   an access token with a set of scopes (AODocs requires at least the email address visibility scope — [https://www.googleapis.com/auth/userinfo.email](https://www.googleapis.com/auth/userinfo.email) — to authorize a user to perform any operation)

Both types of tokens can be generated in a single authentication request, but only one of them is usually necessary.  After this step, the AODocs authentication flow is similar, but with some key differences.

Each request to AODocs APIs must satisfy two requirements: identify the user, and certify that the provided token was generated by Google.  Either of the tokens issued by Google is capable of providing this proof, so the client app can choose which token serves its purposes better.

> 💡   Tip: The ID token is sufficient to perform AODocs-only actions.  Meanwhile, the access token has the same capability, but additionally allows AODocs to impersonate the user to get access to the Drive scopes required to call Drive APIs.

## Get an access or ID token

There are many ways of obtaining an OAuth 2.0 token.  Describing all the use cases is beyond the scope of this article.  You can read more about Google's approach on the following Google documentation pages:

*   [Setting up OAuth 2.0 - API Console Help](https://support.google.com/googleapi/answer/6158849?hl=en)
*   [Using OAuth 2.0 to Access Google APIs | Google Identity Platform](https://developers.google.com/identity/protocols/OAuth2)
*   [OAuth 2.0 for Client-side Web Applications | Google Identity Platform](https://developers.google.com/identity/protocols/OAuth2UserAgent)
*   [Using OAuth 2.0 for Web Server Applications | Google Identity Platform](https://developers.google.com/identity/protocols/OAuth2WebServer)


## Use access or ID token

When you receive tokens from Google, they should look something along the lines of the following.

### Sample tokens from Google

```json
{
  "access_token": "ya29.Il-3B5J8...Fhl3a-yRjpg",
  "id_token": "eyJhbGc8i...AaNVQ"
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "openid https://www.googleapis.com/auth/userinfo.email",
  "refresh_token": "1//04c68...AGAQSNwF-L9Ir2s...M9yc8AqB-u04JncA...68nWovE"
}
```

> ⭑   **Note**: Access tokens usually start with the string ```ya29.```, and because they're opaque (not actual data but pointers to data elsewhere), they're usually shorter than ID tokens.  The latter are longer because they contain actual data, encoded into three pieces: header, claims, and signature.

Once you have obtained a token, you select which token is more appropriate for your use case:

*   access token for AODocs _and_ Drive
*   ID token for just AODocs

You can access AODocs APIs by including one of the tokens as an ```Authorization``` HTTP header's ```Bearer``` value:

```yaml
Authorization: Bearer < access_token | id_token >
```

### Example request with token as header parameter

```yaml
GET https://aodocs.altirnao.com/api/document/v1 HTTP/1.1

Authorization: Bearer [YOUR_TOKEN] \
Accept: application/json \
Content-Type: application/json \
```

```json
{
  "libraryId": "Rngc1ug8K6WmL3IjZ8"
}
```

## Token expiration

All Bearer tokens have a built-in expiration.  If you requested offline access to token scopes, you can [refresh](https://developers.google.com/identity/protocols/OAuth2InstalledApp#offline) tokens as necessary without having to prompt the user for permission.


## Authentication errors with access/ID tokens

Token errors occur only when the token is:

*   missing
*   incorrect
*   expired

All of these result in status code ```401: Unauthorized``` as listed in [HTTP status codes and error scenarios](/docs/aodocs-staging.altirnao.com/1/c/Guides/60-Best%20practices/10-HTTP%20status%20codes%20and%20error%20scenarios).

To create, manage, and troubleshoot your tokens, see the [Google Developers OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).