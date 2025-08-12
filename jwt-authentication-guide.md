# ✅ JWT-Based Authentication Integration Guide

## 🧩 Mục tiêu

Tích hợp hệ thống xác thực người dùng sử dụng **JWT (JSON Web Token)** từ các nhà cung cấp xác thực bên ngoài (OIDC/OAuth2) như:

- Auth0
- Firebase
- AWS Cognito
- Custom OIDC Providers

## 🔐 Cách hoạt động

1. Người dùng đăng nhập thông qua bên thứ ba (OIDC provider).
2. Provider phát hành JWT chứa thông tin người dùng và chữ ký số.
3. Dịch vụ backend của bạn nhận JWT, xác minh tính hợp lệ bằng cách:
   - Kiểm tra chữ ký với **JWKS (JSON Web Key Set)**.
   - Kiểm tra các claims quan trọng như: `iss`, `aud`, `exp`, `iat`, `sub`, v.v.

## ✅ Các Thành phần Cần Xác Minh

| Trường         | Mô tả                                                                 |
|----------------|----------------------------------------------------------------------|
| `iss`          | Issuer - Địa chỉ xác thực phát hành token                            |
| `aud`          | Audience - Đối tượng mà token hướng tới (thường là project ID hoặc domain) |
| `exp`, `iat`   | Thời gian hết hạn và thời gian phát hành                             |
| `sub`          | Subject - đại diện cho người dùng                                     |
| `alg`          | Thuật toán ký - thường là RS256                                       |
| `kid`          | Key ID - dùng để chọn public key phù hợp trong JWKS                  |

## 1️⃣ Auth0 Integration

- **Issuer**: `https://<your-domain>/`
- **JWKS URI**: `https://<your-domain>/.well-known/jwks.json`
- **Algorithm**: `RS256`

## 2️⃣ Firebase Integration

- **Issuer**: `https://securetoken.google.com/<project-id>`
- **JWKS URI**: `https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com`
- **Algorithm**: `RS256`
- **aud** claim phải bằng `<project-id>`

## 3️⃣ AWS Cognito Integration

- **Issuer**: `https://cognito-idp.<region>.amazonaws.com/<user-pool-id>`
- **JWKS URI**: `https://cognito-idp.<region>.amazonaws.com/<user-pool-id>/.well-known/jwks.json`
- **Algorithm**: `RS256`

## 4️⃣ Custom OIDC Integration

- **Issuer**: `https://<your-domain>/`
- **JWKS URI**: `https://<your-domain>/.well-known/jwks.json`
- **Algorithm**: `RS256`

## ⚙️ Các bước triển khai hệ thống xác thực bằng JWT

1. Nhận JWT từ frontend (trong header `Authorization: Bearer <token>`)
2. Giải mã (decode) phần header để lấy `kid`
3. Lấy JWKS từ `/.well-known/jwks.json` của provider
4. Chọn public key tương ứng với `kid`, tạo public key theo định dạng PEM
5. Xác minh chữ ký token (dùng `jsonwebtoken` hoặc `jose`)
6. Kiểm tra thời hạn, issuer, audience, và các claim khác

## 📌 Thư viện đề xuất

- Node.js: `jsonwebtoken`, `jose`
- NestJS: `@nestjs/jwt`
- Go: `github.com/golang-jwt/jwt/v5`
- Python: `PyJWT`

## 🛡️ Mẹo bảo mật

- Kiểm tra `iss`, `aud`, `exp`
- Chỉ cho phép các `alg` như `RS256`
- Cache JWKS trong 5-10 phút

## 📚 Tài liệu tham khảo

- [Auth0 JWT Docs](https://auth0.com/docs/secure/tokens/json-web-tokens)
- [Firebase JWT Docs](https://firebase.google.com/docs/auth/admin/verify-id-tokens)
- [AWS Cognito JWT Docs](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-id-token.html)
- [OIDC Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html)