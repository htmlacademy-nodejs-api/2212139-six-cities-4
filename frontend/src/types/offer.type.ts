import { OfferType } from './offer-type.enum.js';
import { SaveUserType } from './user.type.js';
import { Feature } from './feature-type.enum.js';
import { City } from './city-type.enum.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  cityName: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  offerType: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: Feature[];
  user: SaveUserType;
  commentsCount: number;
  coordinates: Location;
};
