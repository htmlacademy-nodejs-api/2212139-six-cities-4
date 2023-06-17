import { City } from '../../../types/city-type.enum.js';
import { Feature } from '../../../types/feature-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import {
  IsOptional,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import {
  OfferDescriptionLength,
  OfferGuestCount,
  OfferPriceValue,
  OfferRatingValue,
  OfferRoomsCount,
  OfferTitleLength,
  OFFER_PHOTOS_COUNT,
} from '../../../const.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(OfferTitleLength.min, {
    message: 'Minimum title length must be 10',
  })
  @MaxLength(OfferTitleLength.max, {
    message: 'Maximum title length must be 100',
  })
  public title?: string;

  @IsOptional()
  @MinLength(OfferDescriptionLength.min, {
    message: 'Minimum description length must be 20',
  })
  @MaxLength(OfferDescriptionLength.max, {
    message: 'Maximum description length must be 1024',
  })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, {
    message: `cityName must be one of ${Object.values(City).join(', ')}`,
  })
  public cityName?: City;

  @IsOptional()
  @MaxLength(256, { message: 'Too short for field «image»' })
  public preview?: string;

  @IsOptional()
  @ArrayMinSize(OFFER_PHOTOS_COUNT)
  @ArrayMaxSize(OFFER_PHOTOS_COUNT)
  @IsArray({ message: 'Field image must be an array' })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isPremium must be true or false' })
  public isPremium?: boolean;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 1 },
    {
      message:
        'Only 1 digit precision to the right of decimal point is allowed',
    }
  )
  @Min(OfferRatingValue.min, { message: 'Minimum rating is 0' })
  @Max(OfferRatingValue.max, { message: 'Maximum rating is 5' })
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, {
    message: 'type must be one of apartment, house, room, hotel',
  })
  public offerType?: OfferType;

  @IsOptional()
  @IsInt({ message: 'Rooms must be an integer' })
  @Min(OfferRoomsCount.min, { message: 'Minimum rooms is 1' })
  @Max(OfferRoomsCount.max, { message: 'Maximum rooms is 8' })
  public roomsCount?: number;

  @IsOptional()
  @IsInt({ message: 'Guests must be an integer' })
  @Min(OfferGuestCount.min, { message: 'Minimum guests is 1' })
  @Max(OfferGuestCount.max, { message: 'Maximum guests is 10' })
  public guestsCount?: number;

  @IsOptional()
  @IsInt({ message: 'Price must be an integer' })
  @Min(OfferPriceValue.min, { message: 'Minimum price is 100' })
  @Max(OfferPriceValue.max, { message: 'Maximum price is 100000' })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Features categories must be an array' })
  @ArrayMinSize(1, { message: 'There must be at least one feature' })
  @IsEnum(Feature, { each: true, message: 'features must be an array' })
  public features?: Feature[];
}
