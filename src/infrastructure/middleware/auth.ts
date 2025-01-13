import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../../domain/models/User"
import { UserInterface } from "../types/index"

interface AuthRequest extends Request {
  user?: UserInterface;
}

export default async function (req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, "secret") as jwt.JwtPayload;
      
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