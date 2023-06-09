import { CityLocation, UserType } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';
import OfferDto from '../../dto/offer/offer.dto';
import UserDto from '../../dto/user/user.dto';
import { City, Offer, User, Comment, Location } from '../../types/types';

export const adaptCityToClient = (serverCity: string): City => ({
  name: serverCity,
  location: CityLocation[serverCity],
});

export const adaptLocationToClient = (lat: number, lon: number): Location => ({
  latitude: lat,
  longitude: lon,
});

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
  type: user.userType === 'pro' ? UserType.Pro : UserType.Regular,
});

export const adaptOffersToClient = (offers: OfferDto[]): Offer[] =>
  offers
    .filter((offer: OfferDto) => offer.title !== null)
    .map((offer: OfferDto) => ({
      id: offer.id,
      price: offer.price,
      rating: offer.rating,
      title: offer.title,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      city: adaptCityToClient(offer.cityName),
      location: adaptLocationToClient(offer.latitude, offer.longitude),
      previewImage: offer.preview,
      type: offer.offerType,
      bedrooms: offer.roomsCount,
      description: offer.description,
      goods: offer.features,
      host: adaptUserToClient(offer.user),
      images: offer.photos,
      maxAdults: offer.guestsCount,
    }));

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: adaptCityToClient(offer.cityName),
  location: adaptLocationToClient(offer.latitude, offer.longitude),
  previewImage: offer.preview,
  type: offer.offerType,
  bedrooms: offer.roomsCount,
  description: offer.description,
  goods: offer.features,
  host: adaptUserToClient(offer.user),
  images: offer.photos,
  maxAdults: offer.guestsCount,
});

export const adaptCommentsToClient = (comments: CommentDto[]): Comment[] =>
  comments
    .filter((comment: CommentDto) => comment.user !== null)
    .map((comment: CommentDto) => ({
      id: comment.id,
      comment: comment.text,
      date: comment.postDate,
      rating: comment.rating,
      user: adaptUserToClient(comment.user),
    }));

export const adaptCommentToClient = (comment: CommentDto): Comment => ({
  id: comment.id,
  comment: comment.text,
  date: comment.postDate,
  rating: comment.rating,
  user: adaptUserToClient(comment.user),
});
