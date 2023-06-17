import { inject, injectable } from 'inversify';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { CommentEntity } from './comment.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import { DEFAULT_COMMENT_COUNT } from './comment.constant.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(AppComponent.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async createComment(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment;
  }

  public async findByOfferId(
    offerId: string,
    count?: number
  ): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;

    return this.commentModel
      .find({ offerId }, {}, { limit })
      .populate('userId');
  }

  public async findByCommentId(
    commentId: string
  ): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(commentId).populate(['userId']).exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }
}
