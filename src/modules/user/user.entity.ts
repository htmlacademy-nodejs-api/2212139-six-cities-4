import typegoose, {
  getModelForClass,
  defaultClasses,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/common.js';
import { User } from '../../types/user.type.js';

export interface UserEntity extends defaultClasses.Base {}

const { prop, modelOptions } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: '';

  @prop({ unique: false, default: '' })
  public avatarPath: '';

  @prop({ unique: true, default: '' })
  public firstname: '';

  @prop({ unique: true, default: '' })
  public lastname: '';

  @prop({ required: true })
  private password!: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstname = userData.firstname;
    this.lastname = userData.lastname;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
