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
} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title?: string;

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
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsArray({ message: 'Field image must be an array' })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isPremium must be true or false' })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'isFavorite must be true or false' })
  public isFavorite?: boolean;

  @IsOptional()
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, {
    message: 'type must be one of apartment, house, room, hotel',
  })
  public offerType?: OfferType;

  @IsOptional()
  @IsInt({ message: 'Rooms must be an integer' })
  @Min(1, { message: 'Minimum rooms is 1' })
  @Max(8, { message: 'Maximum rooms is 8' })
  public roomsCount?: number;

  @IsOptional()
  @IsInt({ message: 'Guests must be an integer' })
  @Min(1, { message: 'Minimum guests is 1' })
  @Max(10, { message: 'Maximum guests is 10' })
  public guestsCount?: number;

  @IsOptional()
  @IsInt({ message: 'Price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Features categories must be an array' })
  @ArrayMinSize(1, { message: 'There must be at least one feature' })
  @IsEnum(Feature, { each: true, message: 'features must be an array' })
  public features?: Feature[];
}
