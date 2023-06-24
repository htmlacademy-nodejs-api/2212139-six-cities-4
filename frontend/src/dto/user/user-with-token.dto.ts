import { UserType } from '../../types/user-type.enum.js';

export default class UserWithTokenDto {
  public name!: string;

  public email!: string;

  public password!: string;

  public userType!: UserType;

  public token!: string;

  public avatarUrl!: string;
}
