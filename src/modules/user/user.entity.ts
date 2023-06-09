import { ExtendedUserType, SaveUserType } from '../../types/user.type.js';
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
export class UserEntity
  extends defaultClasses.TimeStamps
  implements SaveUserType {
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

  @prop({ default: [] })
  public favorites: string[];

  constructor(userData: ExtendedUserType) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.userType = userData.userType;
    this.favorites = userData.favorites;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
