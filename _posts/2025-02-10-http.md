# HTTP (Hypertext Transfer Protocol)

Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents.

<a href="https://developer.mozilla.org/en-US/" target="_blank">Mozilla MDN Documentation</a>

## HTTP Methods 

1. **GET** retrieves data.
1. **POST** creates resources.
1. **PUT** updates or creates a resource.
1. **PATCH** applies partial updates.
1. **DELETE** removes resources.
1. **HEAD** fetches headers - same as GET but does not return the body, only headers.
1. **OPTIONS** checks available methods - describe the communication options for the target resource.
1. **CONNECT** establishes a tunnel - establish a tunnel to the server, usually for SSL/TLS.
1. **TRACE** perform a message loop-back test along the path to the target resource.

## HTTP Status Codes

1. **1xx: Informational Resource** - indicate that the request was received, and the process is continuing.
   - **100 Continue:** The server has received the request headers, and the client should proceed to send the request body.
1. **2xx: Successful Responses** - the action was successfully received, understood, and accepted.
   - **200 OK:** The request was successful.
   - **201 CREATED:** The request was successful, and a new resource was created.
   - **204 No Content:** The request was successful, but there is no content to send in the response.
1. **3xx: Redirection Messages** - further action needs to be taken to complete the request.
   - **301 Moved Permanently:** The resource has been moved to a new URL permanently.
   - **302 Found:** The resource has been found at a different URL, temporarily.
   - **304 Not Modified:** The resource has not been modified since the last request.
1. **4xx: Client Error Responses** - the request contains bad syntax or cannot be fulfilled.
   - **400 Bad Request:** The server could not understand the request due to invalid syntax.
   - **401 Unauthorized:** Authentication is required, and it has failed or has not been provided.
   - **403 Forbidden:** The server understood the request but refuses to authorize it.
   - **404 Not Found:** The requested resource could not be found on the server.
   - **429 Too Many Requests:** The user has sent too many requests in a given amount of time ("rate limiting").
1. **5xx: Server Error Responses** - the server failed to fulfill a valid request.
   - **500 Internal Server Error:** The server encountered an unexpected condition that prevented it from fulfilling the request.
   - **502 Bad Gateway:** The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   - **503 Service Unavailable:** The server is not ready to handle the request, often due to maintenance or overload.
   - **504 Gateway Timeout:** The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   

## HTTP Headers

### Common HTTP Headers

1. **Accept** - Informs the server about the media types the client can process 
   - [ Accept: text/html, application/xhtml+xml ]
1. **Accept-Encoding** - Indicates the encoding algorithms (like gzip) the client supports (it reduces the size of the payload to 70% and can speed up the application by around 15% - it is very important when we have a large amount of data)
   - [ Accept-Encoding: gzip, deflate, br ]
1. **Accept-Language** - Specifies the preferred languages for the response
   - [ Accept-Language: en-US,en;q=0.5 ]
1. **Content-Type** - Specifies the media type of the resource, crucial for both requests and responses 
   - [ Content-Type: application/json ]
1. **Location** - Used in redirects to indicate the new URL
   - [ Location: https://example.com/new-pag ]

### Caching HTTP Headers

1. **Cache-Control** - Specifies caching policies, helping to improve load times and reduce server load
   - [ Cache-Control: no-cache, no-store, must-revalidate ]
1. **ETag** - Allows the server to identify the version of a resource to enable conditional requests and reduce bandwidth 
   - [ ETag: "12345" ]
1. **Expires** - Specifies an expiration date for cached resources 
   - [ Expires: Wed, 21 Oct 2025 07:28:00 GMT ]

### Authentication HTTP Headers

1. **Basic Authentication** - Basic Authentication encodes the username and password in Base64 and sends it in the header. It’s simple but insecure if not used over HTTPS
   - [ Authorization: Basic < base64-encoded-username:password > ]
1. **Bearer Token Authentication** - Bearer Token Authentication involves sending a token that authorizes the client to access resources. This is commonly used in OAuth 2.0.
   - [ Authorization: Bearer < token > ] 
1. **API Key Authentication** - API Key Authentication uses a key passed in the request header to authenticate the request.
   - [ Authorization: ApiKey your-api-key ] 
1. **Digest Authentication** - Digest Authentication is more secure than Basic Authentication. It involves a server-specified data set that is hashed and sent along with the username.
   - [ Authorization: Digest username="user", realm="example.com", nonce="xyz", uri="/", response="abc123" ] 
1. **HMAC (Hash-Based Message Authentication Code)** - HMAC involves hashing the request data and secret key together to generate a signature.
   - [ Authorization: HMAC username="user", signature="generated-signature" ] 
1. **Custom Token-Based Authentication** - A custom token-based approach can use a custom header field to pass the token.
   - [ X-Auth-Token: your-custom-token ] 

**Notes:**

- **HTTP** - Always use HTTPS to encrypt the headers and protect sensitive information
- **Security** - Avoid sending sensitive data like passwords in headers without encryption
- **Token Expiration** - For token-based methods, consider token expiration and refresh mechanisms
   

### Security Related HTTP Headers

1. **Content Security Policy (CSP):** - CSP helps prevent XSS attacks by controlling the sources from which the browser is allowed to load resources.
   - [ Content-Security-Policy: default-src 'self'; img-src 'self' https://example.com; script-src 'none'; ] 
1. **Cross-Origin Resource Policy (CORP):** - CORP prevents a resource from being loaded by a document from a different origin unless explicitly allowed.
   - [ Cross-Origin-Resource-Policy: same-origin ] 
1. **Cross-Origin Opener Policy (COOP):** - COOP isolates the browsing context, mitigating the risk of cross-origin attacks.
   - [ Cross-Origin-Opener-Policy: same-origin ] 
1. **Cross-Origin Embedder Policy (COEP):** - COEP ensures that the document only loads cross-origin resources that grant permission.
   - [ Cross-Origin-Embedder-Policy: require-corp ] 
1. **DNS Prefetch Control:** - Controls whether the browser prefetches DNS for links to reduce latency.
   - [ X-DNS-Prefetch-Control: off ] 
1. **Expect-CT:** - Helps detect and prevent misissued **SSL/TLS** certificates.
   - [ DNS-Prefetch-Control: off ] 
1. **Feature Policy:** Allows control over which features and APIs can be used in the browser.
   - [ Feature-Policy: geolocation 'self'; microphone 'none' ] 
1. **Frameguard:** Prevents clickjacking attacks by controlling whether the browser can render your site in a frame.
   - [ X-Frame-Options: DENY ] 
1. **Hide Powered-By:** Removes the X-Powered-By header to make it less obvious what technology the app is using.
   - [ X-Powered-By: ]
1. **HSTS (HTTP Strict Transport Security):** Forces the use of HTTPS to prevent man-in-the-middle attacks.
   - [ Strict-Transport-Security: max-age=31536000; includeSubDomains ] 
1. **IE No Open:** Sets X-Download-Options to prevent Internet Explorer from executing downloads in the site's context.
   - [ X-Download-Options: noopen ]
1. **No Sniff:** Helps prevent browsers from sniffing MIME types.
   - [ X-Content-Type-Options: nosniff ]
1. **Referrer Policy:** Controls the information sent in the Referer header.
   - [ Referrer-Policy: no-referrer ]
1. **XSS Filter:**  Enables the Cross-site scripting (XSS) filter built into most browsers.
   - [ X-XSS-Protection: 1; mode=block ] 

### CORS (Cross Origin Resource Sharing) HTTP Headers

**Notes:** CORS is a mechanism that allows web servers to specify who can access their resources from different origins (domains).

1. **Access-Control-Allow-Origin:** Specifies which origin(s) are allowed to access the resource. Can be a specific domain or * (to allow all domains).
   - [ Access-Control-Allow-Origin: https://example.com ]
   - [ Access-Control-Allow-Origin: * ]
1. **Access-Control-Allow-Methods:** Specifies which HTTP methods are allowed when accessing the resource.
   - [ Access-Control-Allow-Methods: GET, POST, PUT, DELETE ]
1. **Access-Control-Allow-Headers:** Lists the headers that are allowed to be used when making the request.
   - [ Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With ]
1. **Access-Control-Allow-Credentials:** Indicates whether credentials (like cookies) are allowed in the request.
   - [ Access-Control-Allow-Credentials: true ]
1. **Access-Control-Max-Age:** Specifies how long the results of a preflight request can be cached.
   - [ Access-Control-Max-Age: 86400 ]


