# JWT Token Server

A Node.js Express server built with TypeScript for generating and testing JWT tokens. This server supports both Firebase custom tokens and JWKS standard tokens for authentication testing purposes.

## Features

- **Firebase Token Generation**: Generate Firebase ID tokens using custom tokens
- **JWKS Standard Tokens**: Generate custom JWT tokens using RSA256 with JWKS support
- **Environment Configuration**: All sensitive configuration loaded from environment variables
- **TypeScript Support**: Full type safety and modern development tools
- **CORS Enabled**: Cross-origin resource sharing for client applications
- **Auto-restart Development**: Hot reload during development

## Prerequisites

- Node.js (v14 or higher)
- Firebase project with Admin SDK credentials
- Service Account Key JSON file

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd server-external-jwt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (or create a new `.env` file)
   - Configure the required environment variables (see Configuration section)

4. Add Firebase Service Account Key:
   - Place your `serviceAccountKey.json` file in the project root
   - Ensure it matches the path in the code

## Configuration

Create a `.env` file in the project root with the following variables:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_firebase_project_id

# JWT Issuer Configuration
ISSUER_NAME=my auth
ISSUER_URL=https://your-domain.com/
ISSUER_AUDIENCE=https://your-domain.com/api
ISSUER_JWKS_URI=https://your-domain.com/.well-known/jwks.json

# Server Configuration
PORT=3006
```

## Development

### Start development server:
```bash
npm run dev
```

### Build the project:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

The server will start on `http://localhost:3006` (or the port specified in your environment variables)

## API Endpoints

### GET /
Health check endpoint
- **Response**: `{ "message": "JWT server ready" }`

### POST /token
Generate a custom JWT token using JWKS standard (RS256)
- **Request**: No body required
- **Response**: 
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ..."
}
```

### POST /token-firebase
Generate a Firebase ID token using custom token
- **Request Body**:
```json
{
  "uid": "user_unique_identifier"
}
```
- **Response**:
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ..."
}
```

### GET /.well-known/jwks.json
JWKS (JSON Web Key Set) endpoint for token verification
- **Response**: Public keys for token verification

## Token Types

### 1. Custom JWKS Tokens (`/token`)
- Uses RSA256 algorithm
- Contains user information (sub, user_id, name, email)
- Follows JWKS standard for key management
- 1-hour expiration time
- Can be verified using the public key from `/.well-known/jwks.json`

### 2. Firebase Tokens (`/token-firebase`)
- Uses Firebase Custom Token flow
- Requires Firebase project setup
- Returns Firebase ID token
- Follows Firebase authentication standards
- User must provide UID in request

## Project Structure

```
server-test/
├── src/
│   ├── index.ts        # Main application file
│   ├── jwks.ts         # JWKS key generation and management
│   └── jwt.ts          # JWT utilities (if exists)
├── public/             # Static files
├── dist/               # Compiled JavaScript (generated)
├── serviceAccountKey.json  # Firebase service account (not in repo)
├── .env               # Environment variables (not in repo)
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Firebase Admin SDK** - Firebase authentication
- **Firebase Client SDK** - Firebase authentication client
- **jose** - JWT signing and verification
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **ts-node-dev** - Development server with hot reload

## Testing

### Test Custom JWT Token:
```bash
curl -X POST http://localhost:3006/token
```

### Test Firebase Token:
```bash
curl -X POST http://localhost:3006/token-firebase \
  -H "Content-Type: application/json" \
  -d '{"uid": "test-user-123"}'
```

### Verify JWKS:
```bash
curl http://localhost:3006/.well-known/jwks.json
```

## Security Considerations

- Keep your `serviceAccountKey.json` file secure and never commit it to version control
- Use environment variables for all sensitive configuration
- Implement proper token validation in your client applications
- Consider token rotation and expiration policies
- Use HTTPS in production environments

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run watch` - Watch for TypeScript changes and compile
- `npm run clean` - Remove dist folder

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
