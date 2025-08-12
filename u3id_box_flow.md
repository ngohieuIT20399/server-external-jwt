# U3ID Authentication Flow (Box Diagram Style)

## Kiến trúc & Luồng xử lý

```
+-----------------------------+
|        Client App          |
|----------------------------|
| - Web App                  |
| - Mobile App               |
| - Backend Service          |
+----------------------------+
              │
              ▼
  Gửi JWT từ bên thứ ba (Auth0, Firebase, Custom...)
              │
              ▼
+-----------------------------+
|         U3ID Server                        |
|------------------------------               |
| - JWT Guard      → Kiểm tra token          |
| - JWT Utils      → Xác minh qua JWKS       |
| - Auth Service   → Trích xuất user info    |
+----------------------------+
              │
              ▼
          Trả về:
+-----------------------------+
| - Wallet Address            |
| - AccessToken               |
+-----------------------------+
              │
              ▼
Sử dụng AccessToken để gọi các API bảo vệ khác
```
