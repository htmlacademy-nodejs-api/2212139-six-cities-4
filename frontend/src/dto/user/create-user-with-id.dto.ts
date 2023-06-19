import { UserType } from '../../types/user-type.enum.js';

export default class CreateUserWithIdDto {
  public id!: string;

  public name!: string;

  public email!: string;

  public password!: string;

  public userType!: UserType;
}
