import { City } from '../../../types/city-type.enum.js';
import { Feature } from '../../../types/feature-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

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
  userId!: string;
  commentsCount!: number;
  coordinates!: string;
}
