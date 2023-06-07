import { Expose, Type } from 'class-transformer';
import OfferRdo from '../../offer/rdo/offer.rdo.js';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class FavoriteRdo {
  @Expose()
  public id!: string;

  @Expose({ name: 'createdAt' })
  public postDate!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose({ name: 'offerId' })
  @Type(() => OfferRdo)
  public offer!: OfferRdo;
}
