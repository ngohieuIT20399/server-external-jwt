# U3ID Authentication Flow (Chi tiết)

## 🔁 Luồng xác thực

```
Client App (U3ID App hoặc Backend)
 ├─ Web App
 ├─ Mobile App
 └─ Backend Service
       │
       ▼
Gửi JWT từ bên thứ ba (Auth0, Firebase, Custom...) vào:
       │
       ▼
U3ID Server
 ├─ JWT Guard         → Kiểm tra token trong request
 ├─ JWT Utils         → Xác minh chữ ký token qua JWKS
 └─ Auth Service      → Trích xuất thông tin user (wallet, email,...)
       │
       ▼
Trả về:
 ├─ Wallet Address
 └─ AccessToken (để dùng các tính năng khác của U3ID)
       │
       ▼
Tiếp tục sử dụng AccessToken để gọi các API protected khác
```
