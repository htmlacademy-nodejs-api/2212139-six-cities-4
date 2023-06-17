import { Expose, Type } from 'class-transformer';
import SaveUserRdo from '../../user/rdo/save-user.rdo.js';

export default class CommentRdo {
  @Expose({ name: '_id' })
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt' })
  public postDate!: string;

  @Expose({ name: 'userId' })
  @Type(() => SaveUserRdo)
  public user!: SaveUserRdo;
}
