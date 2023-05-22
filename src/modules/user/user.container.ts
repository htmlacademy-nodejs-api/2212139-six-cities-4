import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { UserServiceInterface } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import UserService from './user.service.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer
    .bind<UserServiceInterface>(AppComponent.UserServiceInterface)
    .to(UserService)
    .inSingletonScope();
  userContainer
    .bind<types.ModelType<UserEntity>>(AppComponent.UserModel)
    .toConstantValue(UserModel);

  return userContainer;
}
