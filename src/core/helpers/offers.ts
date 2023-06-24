import { DECIMAL_NUMBER_SYSTEM } from '../../const.js';
import { City } from '../../types/city-type.enum.js';
import { Feature } from '../../types/feature-type.enum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { UserType } from '../../types/user-type.enum.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    cityName,
    preview,
    photos,
    premium,
    favorite,
    rating,
    offerType,
    rooms,
    guests,
    price,
    features,
    name,
    email,
    avatarUrl,
    password,
    userType,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarUrl,
    password,
    userType: UserType[userType as keyof typeof UserType],
  };

  const coordinates = {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };

  return {
    title,
    description,
    postDate: new Date(createdDate),
    cityName: City[cityName as keyof typeof City],
    preview,
    photos: photos.split(';'),
    isPremium: !!premium,
    isFavorite: !!favorite,
    rating: Number.parseInt(rating, DECIMAL_NUMBER_SYSTEM),
    offerType: OfferType[offerType as keyof typeof OfferType],
    roomsCount: Number.parseInt(rooms, DECIMAL_NUMBER_SYSTEM),
    guestsCount: Number.parseInt(guests, DECIMAL_NUMBER_SYSTEM),
    price: Number.parseInt(price, DECIMAL_NUMBER_SYSTEM),
    features: features
      .split(';')
      .map((feature) => Feature[feature as keyof typeof Feature]),
    user,
    commentsCount: Number.parseInt(commentsCount, DECIMAL_NUMBER_SYSTEM),
    coordinates,
  } as Offer;
}
