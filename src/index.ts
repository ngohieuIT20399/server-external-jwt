import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import admin from 'firebase-admin';
import { SignJWT } from 'jose';
import path from 'path';
import { generateJWKS, getPrivateKey } from './jwks';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const app = express();
const port = process.env.PORT || 3006;

const issuerConfig = {
  name: process.env.ISSUER_NAME,
  issuer: process.env.ISSUER_URL,
  audience: process.env.ISSUER_AUDIENCE,
  jwksUri: process.env.ISSUER_JWKS_URI,
};


// Load service account key
const serviceAccount = require(path.resolve(__dirname, '../serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

(async () => {
  app.use(cors());
  app.use(express.json());
  
  // Generate JWKS and save to file
  await generateJWKS();

  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // await initKeys(); // init keys on server start

  // Endpoint tạo JWT
app.post('/token', async (req, res) => {
  const privateKey = getPrivateKey();

    const payload = {
      sub: 'e5706b39-ad9d-4f46-8310-369121ff8a59',
      user_id: 'e5706b39-ad9d-4f46-8310-369121ff8a59',
      // user_test: '12345678910',
      name: 'JohnDoe',
      email: 'john@example.com',
      aud: issuerConfig.audience,  // http://localhost:3006/api
      iss: issuerConfig.issuer,    // http://localhost:3006/
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    };

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', kid: 'my-key-id' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKey);

  res.json({ token: jwt });
});

app.post('/token-firebase', async (req, res) => {
    // Init Firebase Admin SDK
  const { uid } = req.body; 
  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }
  try {
    const token = await admin.auth().createCustomToken(uid);

    const app = initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    const auth = getAuth(app);  

    const userCredential = await signInWithCustomToken(auth, token);
    const idToken = await userCredential.user.getIdToken();
    res.json({ token: idToken });
  } catch (error) {
    console.error('Error creating Firebase token:', error);
    res.status(500).json({ error: 'Failed to create Firebase token' });
  }
});

// Simple API
app.get('/', (req, res) => {
  res.json({ message: 'JWT server ready' });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
})();
