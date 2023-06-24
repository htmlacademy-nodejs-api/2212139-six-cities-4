import { City } from '../../types/city-type.enum.js';
import { Feature } from '../../types/feature-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';

export default class UpdateOfferDto {
  public title?: string;

  public description?: string;

  public postDate?: Date;

  public cityName?: City;

  public isPremium?: boolean;

  public rating?: number;

  public offerType?: OfferType;

  public roomsCount?: number;

  public guestsCount?: number;

  public price?: number;

  public features?: Feature[];

  public preview?: string;

  public photos?: string[];

  public userId?: string;

  public latitude?: number;

  public longitude?: number;
}
