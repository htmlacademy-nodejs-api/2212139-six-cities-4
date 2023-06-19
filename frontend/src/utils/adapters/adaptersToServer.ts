import CreateUserDto from '../../dto/user/create-user.dto';
import CreateOfferDto from '../../dto/offer/create-offer.dto';
import CreateCommentDto from '../../dto/comment/create-comment.dto';
import { UserRegister, CommentPost, NewOffer } from '../../types/types';
import { UserType } from '../../types/user-type.enum';

export const adaptSignupToServer = (user: UserRegister): CreateUserDto => ({
  email: user.email,
  name: user.name,
  password: user.password,
  userType: user.type === 'regular' ? UserType.Regular : UserType.Pro,
});

export const adaptOfferToServer = (offer: NewOffer): CreateOfferDto => ({
  title: offer.title,
  description: offer.description,
  postDate: new Date().toISOString(),
  cityName: offer.city.name,
  isPremium: offer.isPremium,
  rating: 3,
  offerType: offer.type,
  roomsCount: offer.bedrooms,
  guestsCount: offer.maxAdults,
  price: offer.price,
  features: offer.goods,
  latitude: offer.location.latitude,
  longitude: offer.location.longitude,
});

export const adaptCreateCommentToServer = (
  comment: CommentPost
): CreateCommentDto => ({
  text: comment.comment,
  offerId: comment.id,
  rating: comment.rating,
});

export const adaptAvatarToServer = (file: string) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};

export const adaptImageToServer = (file: string) => {
  const formData = new FormData();
  formData.set('image', file);

  return formData;
};
