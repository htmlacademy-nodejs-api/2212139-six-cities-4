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
} from 'class-validator';

export default class CreateOfferDto {
  @IsString({ message: 'title is required' })
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title!: string;

  @IsString({ message: 'description is required' })
  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  @IsEnum(City, {
    message: `cityName must be one of ${Object.values(City).join(', ')}`,
  })
  public cityName!: City;

  @IsBoolean({ message: 'isPremium must be true or false' })
  public isPremium!: boolean;

  @IsBoolean({ message: 'isFavorite must be true or false' })
  public isFavorite!: boolean;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating!: number;

  @IsEnum(OfferType, {
    message: 'type must be one of apartment, house, room, hotel',
  })
  public offerType!: OfferType;

  @IsInt({ message: 'Rooms must be an integer' })
  @Min(1, { message: 'Minimum rooms is 1' })
  @Max(8, { message: 'Maximum rooms is 8' })
  public roomsCount!: number;

  @IsInt({ message: 'Guests must be an integer' })
  @Min(1, { message: 'Minimum guests is 1' })
  @Max(10, { message: 'Maximum guests is 10' })
  public guestsCount!: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price!: number;

  @IsArray({ message: 'Features categories must be an array' })
  @ArrayMinSize(1, { message: 'There must be at least one feature' })
  @IsEnum(Feature, { each: true, message: 'features must be an array' })
  public features!: Feature[];

  public userId!: string;

  @IsInt({ message: 'latitude must be an floating point' })
  public latitude!: number;

  @IsInt({ message: 'longitude must be an floating point' })
  public longitude!: number;
}
