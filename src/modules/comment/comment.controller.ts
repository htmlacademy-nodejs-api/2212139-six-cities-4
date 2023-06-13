import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject } from 'inversify';
import { PrivateRouterMiddleware } from '../../common/middlewares/private-router.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/common.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import CommentService from './comment.service.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import CommentRdo from './rdo/comment.rdo.js';

export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentService,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ],
    });
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found`,
        'CommentController'
      );
    }

    const result = await this.commentService.createComment({
      ...body,
      userId: user.id,
    });

    await this.offerService.incCommentCount(body.offerId);
    const comment = await this.commentService.findByCommentId(result.id);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
