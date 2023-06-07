import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import FavoriteService from './favorite.service.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { FavoriteServiceInterface } from './favorite-service.interface.js';

export function createFavoriteContainer() {
  const favoriteContainer = new Container();

  favoriteContainer
    .bind<FavoriteServiceInterface>(AppComponent.FavoriteServiceInterface)
    .to(FavoriteService);
  favoriteContainer
    .bind<types.ModelType<FavoriteEntity>>(AppComponent.FavoriteModel)
    .toConstantValue(FavoriteModel);

  return favoriteContainer;
}
