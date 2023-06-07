import { DocumentType } from '@typegoose/typegoose';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import { FavoriteEntity } from './favorite.entity.js';

export interface FavoriteServiceInterface {
  createFavorite(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>>;
  findFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<FavoriteEntity> | null>;
  findByOfferId(offerId: string): Promise<DocumentType<FavoriteEntity> | null>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity> | null>;
  deleteById(
    userId: string,
    offerId: string
  ): Promise<DocumentType<FavoriteEntity> | null>;
}
