import { Min, Max, IsInt, IsMongoId, IsString, Length } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'Min length is 5, max is 1024' })
  public text!: string;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(0, { message: 'Minimum rating is 0' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating!: string;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;
}
