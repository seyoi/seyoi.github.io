import { JWTPayload, jwtVerify, SignJWT } from "jose";

const alg = "HS256";

export const encodeJWT = async (payload: JWTPayload, expireDate: string) => {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET_KEY);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuer("dcty")
    .setIssuedAt()
    .setExpirationTime(expireDate)
    .sign(secret);

  return jwt;
};

export const decodeJWT = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET_KEY);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
