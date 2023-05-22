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
    type: UserType[userType as keyof typeof UserType],
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
    rating: Number.parseInt(rating, 10),
    offerType: OfferType[offerType as keyof typeof OfferType],
    roomsCount: Number.parseInt(rooms, 10),
    guestsCount: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    features: features
      .split(';')
      .map((feature) => Feature[feature as keyof typeof Feature]),
    user,
    commentsCount: Number.parseInt(commentsCount, 10),
    coordinates,
  } as Offer;
}
