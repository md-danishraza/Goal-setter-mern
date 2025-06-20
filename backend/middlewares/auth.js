import { validateToken } from "../utils/auth.js";
import appError from "../utils/appError.js";
import wrapAsync from "../utils/wrapAsync.js";

export const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token
      const token = req.headers.authorization.split(" ")[1];

      // verify
      const decoded = validateToken(token);
      // set user to req object or find from db using id
      req.user = decoded;

      next();
    } catch (error) {
      console.log(error);
      throw new appError("Not authorized", 401);
    }
  } else {
    //   if no auth token
    throw new appError("Not authorized", 401);
  }
};
