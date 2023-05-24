import { User } from '../../types/user.type.js';
import typegoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/index.js';
import { UserType } from '../../types/user-type.enum.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarUrl: string;

  @prop({ required: true, default: 'обычный' })
  public userType: UserType;

  @prop({ required: true })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
