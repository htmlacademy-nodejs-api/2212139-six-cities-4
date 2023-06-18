import { IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'avatarUrl is required' })
  public avatarUrl?: string;

  public favorites?: ObjectId[];
}
