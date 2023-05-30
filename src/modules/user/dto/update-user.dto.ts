import { UserType } from '../../../types/user-type.enum.js';

export default class UpdateUserDto {
  public name?: string;
  public avatarUrl?: string;
  public userType?: UserType;
}
