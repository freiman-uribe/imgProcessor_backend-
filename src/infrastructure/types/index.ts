import { Types } from "mongoose";

export interface UserInterface {
  id?: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  userType: "Client";
}

export interface ImageInterface {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  url: string;
  timestamp: Date;
}
