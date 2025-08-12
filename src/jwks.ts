import fs from 'fs';
import { exportJWK, generateKeyPair } from 'jose';
import path from 'path';

let publicJWK: any;
let privateKey: any;

// Generate key pair once at runtime
export async function generateJWKS() {
  const jwksPath = path.join(__dirname, '..', 'public', '.well-known', 'jwks.json');
  
  // Check if JWKS file already exists
  if (fs.existsSync(jwksPath)) {
    console.log('JWKS file already exists at:', jwksPath);
    
    // Load existing JWKS
    const existingJWKS = JSON.parse(fs.readFileSync(jwksPath, 'utf8'));
    if (existingJWKS.keys && existingJWKS.keys.length > 0) {
      publicJWK = existingJWKS.keys[0];
      console.log('Using existing JWKS');
      return;
    }
  }

  const { publicKey, privateKey: privKey } = await generateKeyPair('RS256');
  const jwk = await exportJWK(publicKey);

  jwk.kid = 'my-key-id'; // set a fixed key id
  jwk.alg = 'RS256';
  jwk.use = 'sig';

  publicJWK = jwk;
  privateKey = privKey;

  // Save JWKS to file
  const jwksData = {
    keys: [publicJWK]
  };
  
  // Ensure directory exists
  const jwksDir = path.dirname(jwksPath);
  if (!fs.existsSync(jwksDir)) {
    fs.mkdirSync(jwksDir, { recursive: true });
  }

  // Write JWKS to file
  fs.writeFileSync(jwksPath, JSON.stringify(jwksData, null, 2));
  console.log('JWKS file generated at:', jwksPath);
}

export function getJWKS() {
  return {
    keys: [publicJWK]
  };
}

export function getPrivateKey() {
  return privateKey;
}
