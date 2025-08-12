# U3ID Authentication Flow with Third-Party JWT Providers

## 1. Kiến trúc hệ thống

```
+-------------------------+     +-------------------------+     +--------------------------+
|       Client App        |     |       U3ID Server       |     |       JWT Providers      |
|-------------------------|     |-------------------------|     |--------------------------|
| - Web App               |     | - JWT Guard             |     | - Auth0                  |
| - Mobile App            |<--->| - JWT Utils             |<--->| - Firebase               |
| - API Client            |     | - Auth Service          |     | - Internal JWT           |
+-------------------------+     +-------------------------+     +--------------------------+
```

## 2. Cấu hình nhà cung cấp JWT

(Thêm nội dung cấu hình provider tại đây...)
