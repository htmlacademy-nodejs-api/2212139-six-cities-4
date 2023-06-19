import { City } from '../../../types/city-type.enum.js';
import { Feature } from '../../../types/feature-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
  IsBoolean,
  IsString,
  IsNumber,
  Validate,
  ArrayMaxSize,
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
import { ValidImageFormat } from '../../../common/middlewares/valid-image-format.middleware.js';

export default class CreateOfferDto {
  @IsString({ message: 'title is required' })
  @MinLength(OfferTitleLength.min, {
    message: 'Minimum title length must be 10',
  })
  @MaxLength(OfferTitleLength.max, {
    message: 'Maximum title length must be 100',
  })
  public title!: string;

  @IsString({ message: 'description is required' })
  @MinLength(OfferDescriptionLength.min, {
    message: 'Minimum description length must be 20',
  })
  @MaxLength(OfferDescriptionLength.max, {
    message: 'Maximum description length must be 1024',
  })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  @IsEnum(City, {
    message: `cityName must be one of ${Object.values(City).join(', ')}`,
  })
  public cityName!: City;

  @IsBoolean({ message: 'isPremium must be true or false' })
  public isPremium!: boolean;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    {
      message:
        'Only 1 digit precision to the right of decimal point is allowed',
    }
  )
  @Min(OfferRatingValue.min, { message: 'Minimum rating is 0' })
  @Max(OfferRatingValue.max, { message: 'Maximum rating is 5' })
  public rating!: number;

  @IsEnum(OfferType, {
    message: 'type must be one of apartment, house, room, hotel',
  })
  public offerType!: OfferType;

  @IsInt({ message: 'Rooms must be an integer' })
  @Min(OfferRoomsCount.min, { message: 'Minimum rooms is 1' })
  @Max(OfferRoomsCount.max, { message: 'Maximum rooms is 8' })
  public roomsCount!: number;

  @IsInt({ message: 'Guests must be an integer' })
  @Min(OfferGuestCount.min, { message: 'Minimum guests is 1' })
  @Max(OfferGuestCount.max, { message: 'Maximum guests is 10' })
  public guestsCount!: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(OfferPriceValue.min, { message: 'Minimum price is 100' })
  @Max(OfferPriceValue.max, { message: 'Maximum price is 100000' })
  public price!: number;

  @IsArray({ message: 'Features categories must be an array' })
  @ArrayMinSize(1, { message: 'There must be at least one feature' })
  @IsEnum(Feature, { each: true, message: 'features must be an array' })
  public features!: Feature[];

  @IsString({ message: '$property must be a string' })
  @Validate(ValidImageFormat)
  public preview!: string;

  @IsArray({ message: '$property must be an array' })
  @ArrayMaxSize(OFFER_PHOTOS_COUNT, {
    message: '$property must contain exactly $constraint1 items',
  })
  @ArrayMinSize(OFFER_PHOTOS_COUNT, {
    message: '$property must contain exactly $constraint1 items',
  })
  @IsString({ message: '$property must be a string', each: true })
  @Validate(ValidImageFormat, { each: true })
  public photos!: string[];

  public userId!: string;

  public latitude!: number;

  public longitude!: number;
}
