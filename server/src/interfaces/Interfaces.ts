import { Document } from 'mongoose';

export interface IMovie {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface IUser {
  _id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}