import { Expose } from 'class-transformer';

export default class SaveUserRdo {
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
}
