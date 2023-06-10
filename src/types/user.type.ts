import { ObjectId } from 'mongoose';
import { UserType } from './user-type.enum.js';

export type MiddleUserType = {
  name: string;
  email: string;
  avatarUrl: string;
  userType: UserType;
  password: string;
};

export type SaveUserType = {
  name: string;
  email: string;
  avatarUrl: string;
  userType: UserType;
};

export type ExtendedUserType = {
  name: string;
  email: string;
  avatarUrl: string;
  userType: UserType;
  password: string;
  favorites: ObjectId[];
};
