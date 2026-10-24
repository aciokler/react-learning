# Keycloak Configuration

## Realm

- **Realm name:** `demo`
- **Realm import file:** `keycloak/realm.json`

## Issuer URL

- **From host machine (browser/local tools):** `http://localhost:8080/realms/demo`
- **From Docker network (containers):** `http://keycloak:8080/realms/demo`

## OpenID Connect Endpoints (realm `demo`)

- **Authorization endpoint:** `http://localhost:8080/realms/demo/protocol/openid-connect/auth`
- **Token endpoint:** `http://localhost:8080/realms/demo/protocol/openid-connect/token`
- **JWKS endpoint:** `http://localhost:8080/realms/demo/protocol/openid-connect/certs`
- **Userinfo endpoint:** `http://localhost:8080/realms/demo/protocol/openid-connect/userinfo`
- **OIDC discovery document:** `http://localhost:8080/realms/demo/.well-known/openid-configuration`

## Clients

### `spring-boot-api`

- **Type:** Public client
- **Flow:** Authorization Code + PKCE (`S256`)
- **Client secret:** None
- **Direct access grants:** Disabled
- **Redirect URIs:**
  - `http://localhost:5173/*`
  - `http://localhost:9090/*`
- **Web origins:**
  - `http://localhost:5173`
  - `http://localhost:9090`

### `service-account-client`

- **Type:** Confidential client
- **Flow:** Client Credentials (service account enabled)
- **Client secret:** `service-account-client-secret`
- **Standard flow:** Disabled
- **Direct access grants:** Disabled

## API Resource Server Configuration

- **Property key:** `spring.security.oauth2.resourceserver.jwt.issuer-uri`
- **Configured value source:** `KEYCLOAK_ISSUER_URI`
- **Default fallback:** `http://localhost:8080/realms/demo`
