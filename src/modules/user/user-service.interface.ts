import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import UpdateUserDto from './dto/update-user.dto.js';

export interface UserServiceInterface {
  createUser(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

  findUserByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findUserOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;

  updateByUserId(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity>| null>;
}
