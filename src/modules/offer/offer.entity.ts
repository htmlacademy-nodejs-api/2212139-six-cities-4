import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';
import { City } from '../../types/city-type.enum.js';
import { Feature } from '../../types/feature-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { RATING_DEFAULT } from './offer.constant.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({ type: () => String, enum: City, required: true })
  public cityName!: City;

  @prop({ default: '', required: true })
  public preview!: string;

  @prop({ type: String, required: true })
  public photos!: string[];

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, default: false })
  public isFavorite!: boolean;

  @prop({ required: true, default: RATING_DEFAULT })
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required: true,
  })
  public offerType!: OfferType;

  @prop({ default: 1, required: true })
  public roomsCount!: number;

  @prop({ default: 1, required: true })
  public guestsCount!: number;

  @prop({ default: 0, required: true })
  public price!: number;

  @prop({
    type: String,
    enum: Feature,
    required: true,
  })
  public features!: Feature[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
