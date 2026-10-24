# OpenID Connect Setup

This project uses OpenID Connect in two places:

- **UI (React/Vite):** login with Authorization Code + PKCE
- **API (Spring Boot):** JWT resource server validation

See `KEYCLOAK.md` for realm/client details and endpoint URLs.

## 1) Install OIDC dependencies ("plugins")

### UI (`ui/`)

Install the OIDC client libraries:

```bash
cd ui
npm install react-oidc-context oidc-client-ts
```

These are already declared in `ui/package.json`:

- `react-oidc-context`
- `oidc-client-ts`

### API (`api/`)

Add Spring Security OAuth2 Resource Server dependencies in `api/pom.xml`:

- `spring-boot-starter-security`
- `spring-boot-starter-security-oauth2-resource-server`

For tests:

- `spring-boot-starter-security-oauth2-resource-server-test`
- `spring-boot-starter-security-test`

## 2) Add OIDC to the codebase

### UI wiring

1. Wrap the app with `AuthProvider` in `ui/src/main.tsx`.
2. Configure:
   - `authority`: `http://localhost:8080/realms/demo`
   - `client_id`: `spring-boot-api`
   - `redirect_uri`: `window.location.origin`
3. Use `useAuth()` in `ui/src/App.tsx` to:
   - call `signinRedirect()` for login
   - call `removeUser()` for logout
   - read authenticated user claims from `auth.user`

### API wiring

1. Configure issuer URI in `api/src/main/resources/application.properties`:

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=${KEYCLOAK_ISSUER_URI}
```

2. Set `KEYCLOAK_ISSUER_URI` to:

```text
http://localhost:8080/realms/demo
```

3. Configure Spring Security in `api/src/main/java/com/demo/api/SecurityConfig.java`:
   - require authentication for all endpoints
   - enable OAuth2 resource server JWT validation
   - map `realm_access.roles` to authorities with `ROLE_` prefix

## 3) Keycloak client expectations

- **UI client (`spring-boot-api`)**
  - public client
  - no client secret
  - standard flow enabled
  - PKCE (S256) enabled

- **Service account client (`service-account-client`)**
  - confidential client
  - uses client credentials grant
  - has client secret
