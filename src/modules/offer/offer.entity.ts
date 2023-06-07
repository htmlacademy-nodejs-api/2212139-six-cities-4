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

  @prop({ trim: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({ type: () => String, enum: City })
  public cityName!: City;

  @prop({ default: '' })
  public preview!: string;

  @prop({ type: String })
  public photos!: string[];

  @prop({ default: false })
  public isPremium!: boolean;

  @prop({ default: false })
  public isFavorite!: boolean;

  @prop({ default: RATING_DEFAULT })
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
  })
  public offerType!: OfferType;

  @prop({ default: 1 })
  public roomsCount!: number;

  @prop({ default: 1 })
  public guestsCount!: number;

  @prop({ default: 0 })
  public price!: number;

  @prop({
    type: String,
    enum: Feature,
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
