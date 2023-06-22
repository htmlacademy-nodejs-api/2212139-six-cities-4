import { UserType } from '../../types/user-type.enum.js';

export default class UserDto {
  public name!: string;

  public email!: string;

  public userType!: UserType;

  public avatarUrl!: string;
}
