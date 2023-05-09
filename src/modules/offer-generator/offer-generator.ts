import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import {
  generateRandomValue,
  getBooleanValue,
  getCoordinates,
  getPostDate,
  getRandomItem,
  getRandomItems,
} from '../../core/helpers/index.js';
import {
  CommentCountValue,
  OfferGuestCount,
  OfferPriceValue,
  OfferRatingValue,
  OfferRoomsCount,
} from '../../const.js';
import { Feature } from '../../types/feature-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { City } from '../../types/city-type.enum.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getPostDate();
    const cityName = getRandomItem<City>(Object.values(City));
    const preview = getRandomItem<string>(this.mockData.preview);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = getBooleanValue();
    const isFavorite = getBooleanValue();
    const rating = generateRandomValue(
      OfferRatingValue.min,
      OfferRatingValue.max,
      OfferRatingValue.numAfterDigits
    );
    const offerType = getRandomItem<string>(Object.values(OfferType));
    const roomsCount = generateRandomValue(
      OfferRoomsCount.min,
      OfferRoomsCount.max
    );
    const guestsCount = generateRandomValue(
      OfferGuestCount.min,
      OfferGuestCount.max
    );
    const price = generateRandomValue(OfferPriceValue.min, OfferPriceValue.max);
    const features = getRandomItems(Object.values(Feature)).join(';');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const type = getRandomItem(['regular', 'pro']);
    const commentsCount = generateRandomValue(
      CommentCountValue.min,
      CommentCountValue.max
    );
    const [latitude, longitude] = getCoordinates(cityName);

    return [
      title,
      description,
      postDate,
      cityName,
      preview,
      photos,
      isPremium,
      isFavorite,
      rating,
      offerType,
      roomsCount,
      guestsCount,
      type,
      price,
      features,
      name,
      email,
      avatarUrl,
      password,
      type,
      commentsCount,
      latitude,
      longitude,
    ].join('\t');
  }
}
