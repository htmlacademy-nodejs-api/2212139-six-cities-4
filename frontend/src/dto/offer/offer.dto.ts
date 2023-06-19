import { City } from '../../types/city-type.enum.js';
import { Feature } from '../../types/feature-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import UserDto from '../user/user.dto.js';

export default class OfferDto {
  public _id!: string;

  public title!: string;

  public description!: string;

  public postDate!: Date;

  public cityName!: City;

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public offerType!: OfferType;

  public roomsCount!: number;

  public guestsCount!: number;

  public price!: number;

  public features!: Feature[];

  public preview!: string;

  public photos!: string[];

  public user!: UserDto;

  public latitude!: number;

  public longitude!: number;
}
