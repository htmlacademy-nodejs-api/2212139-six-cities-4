import { Expose } from 'class-transformer';
import { City } from '../../../types/city-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class SaveOfferRdo {
  @Expose()
  public title!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public cityName!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: OfferType;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
