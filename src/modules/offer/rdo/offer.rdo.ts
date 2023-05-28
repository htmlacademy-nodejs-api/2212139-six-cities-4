import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city-type.enum';
import { Feature } from '../../../types/feature-type.enum';
import { OfferType } from '../../../types/offer-type.enum';
import UserRdo from '../../user/rdo/user.rdo';

export default class OfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public cityName!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: OfferType;

  @Expose()
  public apartment!: string;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: Feature[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public userId!: UserRdo;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
