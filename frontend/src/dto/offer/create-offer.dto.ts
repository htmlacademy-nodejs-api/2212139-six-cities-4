export default class CreateOfferDto {
  public title!: string;

  public description!: string;

  public postDate!: string;

  public cityName!: string;

  public isPremium!: boolean;

  public rating!: number;

  public offerType!: string;

  public roomsCount!: number;

  public guestsCount!: number;

  public price!: number;

  public features!: string[];

  public latitude!: number;

  public longitude!: number;
}
