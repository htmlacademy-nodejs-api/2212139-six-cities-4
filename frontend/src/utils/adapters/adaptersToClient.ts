import { CityLocation, UserType } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';
import OfferDto from '../../dto/offer/offer.dto';
import UserDto from '../../dto/user/user.dto';
import { City, Offer, User, Comment } from '../../types/types';

export const adaptCityToClient = (serverCity: string): City => ({
  name: serverCity,
  location: CityLocation[serverCity],
});

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
  type: user.userType === 'обычный' ? UserType.Regular : UserType.Pro,
});

export const adaptOffersToClient = (offers: OfferDto[]): Offer[] =>
  offers
    .filter((offer: OfferDto) => offer.user !== null)
    .map((offer: OfferDto) => ({
      id: offer._id,
      price: offer.price,
      rating: offer.rating,
      title: offer.title,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      city: adaptCityToClient(offer.cityName),
      location: CityLocation[offer.cityName],
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
  id: offer._id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: adaptCityToClient(offer.cityName),
  location: CityLocation[offer.cityName],
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
