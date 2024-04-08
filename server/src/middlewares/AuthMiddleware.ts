import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Define the payload interface
interface JwtPayload {
  role: string;
}

// Extend the Request interface to include the user property
declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

export function checkRoles(roles: string[]) {
  return function (req: ExpressRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token provided!" });
    }

    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;

      if (!roles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden access. User doesn't have the required role." });
      }
      req.user = payload;

      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden access. Invalid token." });
    }
  }
}
