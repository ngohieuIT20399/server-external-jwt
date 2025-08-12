import { jwtVerify } from 'jose';

const ISSUER = 'http://localhost:3000';
const AUDIENCE = 'my-audience';

// export async function generateToken(payload: object) {
//   const privateKey = getPrivateKey();
//   const alg = 'RS256';

//   const jwt = await new SignJWT(payload)
//     .setProtectedHeader({ alg, kid: 'my-key-id' })
//     .setIssuer(ISSUER)
//     .setAudience(AUDIENCE)
//     .setExpirationTime('1h')
//     .setIssuedAt()
//     .sign(privateKey);

//   return jwt;
// }

export async function verifyToken(token: string, publicKey: any) {
  return await jwtVerify(token, publicKey, {
    issuer: ISSUER,
    audience: AUDIENCE
  });
}
