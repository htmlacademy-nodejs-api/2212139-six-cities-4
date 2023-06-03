import { IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString({ message: 'avatarUrl is required' })
  public avatarUrl?: string;
}
