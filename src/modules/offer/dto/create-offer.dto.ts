import { City } from '../../../types/city-type.enum.js';
import { Feature } from '../../../types/feature-type.enum.js';
import { Location } from '../../../types/location.type.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { User } from '../../../types/user.type.js';

export default class CreateOfferDto {
  title!: string;
  description!: string;
  postDate!: Date;
  cityName!: City;
  preview!: string;
  photos!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  offerType!: OfferType;
  roomsCount!: number;
  guestsCount!: number;
  price!: number;
  features!: Feature[];
  user!: User;
  commentsCount!: number;
  coordinates!: Location;
}
