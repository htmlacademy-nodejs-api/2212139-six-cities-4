import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import OfferRdo from './rdo/offer.rdo.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import DocumentExistsMiddleware from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouterMiddleware } from '../../common/middlewares/private-router.middleware.js';
import { FavoriteServiceInterface } from '../favorite/favorite-service.interface.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file-middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import FavoriteRdo from '../favorite/rdo/favorite.rdo.js';
import UploadImageRdo from '../favorite/rdo/upload-image.rdo.js';
import UploadImagesRdo from './rdo/upload-images.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { UnknownRecord } from '../../types/unknown-record.type.js';

type ParamsOfferDetails =
  | {
      offerId: string;
    }
  | ParamsDictionary;

type ParamsGetPremium =
  | {
      cityName: string;
    }
  | ParamsDictionary;

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.FavoriteServiceInterface)
    private readonly favoriteService: FavoriteServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.showFavorite,
      middlewares: [new PrivateRouterMiddleware()],
    });
    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/favorite/:offerId',
      method: HttpMethod.Patch,
      handler: this.setStatusFavorite,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/premium/:cityName',
      method: HttpMethod.Get,
      handler: this.showPremium,
    });

    this.addRoute({
      path: '/:offerId/previewimage',
      method: HttpMethod.Post,
      handler: this.uploadPrevImage,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'preview'
        ),
      ],
    });
    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouterMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'photos'
        ),
      ],
    });
  }

  public async show(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    {
      body,
      user,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.createOffer({
      ...body,
      userId: user.id,
    });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteByOfferId(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {
      body,
      params,
    }: Request<ParamsOfferDetails, UnknownRecord, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateByOfferId(
      params.offerId,
      body
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments(
    { params }: Request<ParamsOfferDetails, UnknownRecord, UnknownRecord>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async showPremium(
    { params }: Request<ParamsGetPremium>,
    res: Response
  ): Promise<void> {
    const { cityName } = params;
    const offers = await this.offerService.findPremiumOffers(cityName);
    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Premium offer with city ${cityName} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async showFavorite(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavoriteOffers();

    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Favorite offers not found',
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async setStatusFavorite(
    req: Request<ParamsOfferDetails, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const { params, user } = req;
    const offerCheck = await this.favoriteService.findFavorite(
      user.id,
      params.offerId
    );
    if (!offerCheck) {
      const favorite = await this.favoriteService.createFavorite({
        userId: user.id,
        offerId: params.offerId,
      });
      await this.offerService.setFavoriteStatusOffer(params.offerId);
      this.created(res, fillDTO(FavoriteRdo, favorite));
    } else {
      const favorite = await this.favoriteService.deleteById(
        user.id,
        params.offerId
      );
      await this.offerService.setFavoriteStatusOffer(params.offerId);
      this.noContent(res, favorite);
    }
  }

  public async uploadPrevImage(
    req: Request<ParamsOfferDetails>,
    res: Response
  ) {
    const { offerId } = req.params;
    const updateDto = { preview: req.file?.filename };
    await this.offerService.updateByOfferId(offerId, updateDto);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }

  public async uploadImages(req: Request<ParamsOfferDetails>, res: Response) {
    const { offerId } = req.params;
    const fileArray = req.files as Array<Express.Multer.File>;
    const fileNames = fileArray.map((file) => file.filename);
    const updateDto = { photos: fileNames };
    await this.offerService.updateByOfferId(offerId, updateDto);
    this.created(res, fillDTO(UploadImagesRdo, updateDto));
  }
}
