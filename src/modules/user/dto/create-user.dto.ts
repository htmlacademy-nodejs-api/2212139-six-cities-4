import { UserType } from '../../../types/user-type.enum.js';
import { IsEmail, IsString, Length, IsEnum } from 'class-validator';
import { UserNameLingth, UserPasswordLength } from '../../../const.js';
import { ObjectId } from 'mongoose';

export default class CreateUserDto {
  @IsString({ message: 'name is required' })
  @Length(UserNameLingth.min, UserNameLingth.max, {
    message: 'Min length is 1, max is 15',
  })
  public name!: string;

  @IsString({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'userType is required' })
  @IsEnum(UserType, { message: 'type must be one of pro or обычный' })
  public userType!: UserType;

  @IsString({ message: 'password is required' })
  @Length(UserPasswordLength.min, UserPasswordLength.max, {
    message: 'Min length for password is 6, max is 12',
  })
  public password!: string;

  public favorites!: ObjectId[];
}
