import { Min, Max, IsInt, IsMongoId, IsString, Length } from 'class-validator';
import { CommentTextLength, OfferRatingValue } from '../../../const.js';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(CommentTextLength.min, CommentTextLength.max, {
    message: 'Min length is 5, max is 1024',
  })
  public text!: string;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(OfferRatingValue.min, { message: 'Minimum rating is 0' })
  @Max(OfferRatingValue.max, { message: 'Maximum rating is 5' })
  public rating!: string;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;
}
