import { User } from './user.type.js';

export type Comment = {
  content: string;
  date: Date;
  rating: number;
  user: User;
}
