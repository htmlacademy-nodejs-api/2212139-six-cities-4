import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';
import { City } from '../../types/city-type.enum.js';
import { Feature } from '../../types/feature-type.enum.js';
import { Location } from '../../types/location.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

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

  @prop()
  public preview!: string;

  @prop()
  public photos!: string[];

  @prop({ default: false })
  public isPremium!: boolean;

  @prop({ default: false })
  public isFavorite!: boolean;

  @prop({ default: 0 })
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

  @prop()
  public coordinates!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
