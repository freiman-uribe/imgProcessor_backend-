import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from "../../utils/jwtutils";
import User from "../../domain/models/User"
import { UserInterface } from "../types/index"

interface AuthRequest extends Request {
  user?: UserInterface;
}

export default async function (req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
      const decoded = verifyToken(token) as jwt.JwtPayload;
      
      const user = await User.findById(decoded.user.id);
      if (!user) {
        return res.status(401).json({ msg: "User does not exist" });
      }

      req.user = decoded.user;

      next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};