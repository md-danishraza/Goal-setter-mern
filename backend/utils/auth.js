import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

// console.log(secret);

// fn to create JWT
export function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

// fn to verify JWT
export function validateToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}
