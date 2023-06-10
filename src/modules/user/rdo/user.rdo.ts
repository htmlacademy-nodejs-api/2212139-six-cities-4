import { Expose } from 'class-transformer';
import { ObjectId } from 'mongoose';

export default class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public name!: string;

  @Expose()
  public userType!: string;

  @Expose()
  public favorites!: ObjectId[];
}
