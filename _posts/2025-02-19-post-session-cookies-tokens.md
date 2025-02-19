---
title: "Session Cookies and Tokens"
date: 2025-02-19
classes: wide
categories:
  - System Design
tags:
  - Http
  - OAuth
---

## What is a Session?

A session is a temporary state maintained on the server that tracks a user’s activity across multiple requests. It typically stores user authentication details, preferences, or other data needed during an interaction.

### How It Works

- User logs in → Server creates a session (stores it in memory, database, or file).
- The server generates a session ID and sends it to the client in a cookie.
- The client sends the session ID on every request → Server retrieves session data.

## What is a Cookie?

A cookie is a small piece of data stored on the client (browser) and sent to the server with every request. It can store user preferences, authentication details, or tracking information.

### How It Works

- Server sends a Set-Cookie header → Browser stores the cookie.
- Browser sends the cookie with every subsequent request.

### Types of Cookies

- Session Cookies: Deleted when the browser is closed.
- Persistent Cookies: Stored for a long time (set expiration date).
- Secure Cookies: Only sent over HTTPS.
- HttpOnly Cookies: Not accessible by JavaScript (prevents XSS attacks).
- SameSite Cookies: Prevents CSRF attacks by restricting cross-site requests.

## What is a Token?

A token is a cryptographic string used to authenticate users without storing state on the server. The most common type is JSON Web Token (JWT).

### How It Works

- User logs in → Server generates a JWT and sends it to the client.
- Client stores the JWT in localStorage, sessionStorage, or a cookie.
- The client sends the JWT with every request in the Authorization header.
- The server verifies the JWT using a secret key (HMAC) or public/private key pair (RSA).


## Comparison

|Feature|Session|Cookies|Tokens|
|-------|-------|-------|------|
|Definition|A server-side mechanism to store user state.|Small pieces of data stored in the browser.|A cryptographic string used for authentication and authorization.|
|Storage|Stored on the server.|Stored on the client (browser).|Stored on the client but verified by the server.|
|Security|More secure (server-side).|Less secure (can be stolen via XSS).|More secure if implemented properly (e.g., JWT signed with HMAC or RSA).|
|Persistence|Lives as long as the session is active (until timeout or logout).|Can be persistent (stored on disk) or session-based (deleted on close).|Can be persistent, usually with an expiration time.|
|Use Case|Maintaining user authentication across multiple requests.|Storing small amounts of client-side data like preferences or session IDs.|API authentication (JWT), stateless authentication, Single Sign-On (SSO).|
|Access Scope|Server-only.|Client-side but can be sent to the server.|Client-side but verifiable by the server.|
|Example|PHP $_SESSION, Express express-session|document.cookie = "user=John"|JWT (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)|

## How They Work Together

- **Session + Cookies:** A session ID is stored in a cookie and sent with each request to maintain authentication.
- **Tokens (JWT) + Cookies:** JWTs can be stored in cookies (HttpOnly for security) or localStorage/sessionStorage.
- **Tokens vs. Sessions:** Sessions require server storage, while tokens (like JWT) allow stateless authentication.

## Best Practices

### For Sessions

- Use secure cookies for session IDs (HttpOnly, Secure, SameSite=Strict).
- Regenerate session IDs on login to prevent session fixation.
- Set a timeout for inactive sessions.

### For Cookies

- Use HttpOnly and Secure flags to prevent JavaScript access.
- Use SameSite=Strict or Lax to prevent CSRF attacks.
- Encrypt sensitive data (don’t store passwords in cookies).

### For Tokens (JWT)

- Use short-lived tokens (e.g., 15 min) + refresh tokens.
- Store JWTs in HttpOnly cookies instead of localStorage.
- Sign JWTs with strong algorithms (HS256 for shared secret, RS256 for public/private key pairs).


