import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

  findById(UserId: string): Promise<DocumentType<UserEntity> | null>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;

  updateById(
    userId: string,
    dto: UpdateUserDto
  ): Promise<DocumentType<UserEntity> | null>;

  verifyUser(
    dto: LoginUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity> | null>;

  addToFavoriteById(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity>[] | null>;

  removeFromFavoritesById(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity>[] | null>;
}
