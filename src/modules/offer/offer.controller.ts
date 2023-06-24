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
import { UploadFileMiddleware } from '../../common/middlewares/upload-file-middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import UploadImagesRdo from './rdo/upload-images.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import SaveOfferRdo from './rdo/save-offer.rdo.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { DEFAULT_PREVIEW_IMAGES } from './offer.constant.js';
import { getRandomItem } from '../../core/helpers/index.js';
import UploadPreviewRdo from './rdo/upload-preview.rdo.js';
import { CheckTokenInBlackListMiddleware } from '../../common/middlewares/check-token-in-black-list.middleware.js';
import { UploadFilesMiddleware } from '../../common/middlewares/upload-files.middleware.js';

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
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.ConfigInterface)
    configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouterMiddleware(),
        new CheckTokenInBlackListMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouterMiddleware(),
        new CheckTokenInBlackListMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouterMiddleware(),
        new CheckTokenInBlackListMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/favorite/get',
      method: HttpMethod.Get,
      handler: this.showFavorite,
      middlewares: [
        new PrivateRouterMiddleware(),
        new CheckTokenInBlackListMiddleware(),
      ],
    });

    this.addRoute({
      path: '/favorite/get/:offerId',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouterMiddleware(),
        new CheckTokenInBlackListMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/favorite/get/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new PrivateRouterMiddleware(),
        new CheckTokenInBlackListMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
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
        new CheckTokenInBlackListMiddleware(),
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
        new CheckTokenInBlackListMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFilesMiddleware(
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

  public async index(
    req: Request<ParamsOfferDetails, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const { query, user } = req;
    const offers = await this.offerService.find(user?.id, query?.limit);
    this.send(res, StatusCodes.OK, offers);
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const randomPreviewImage = getRandomItem(DEFAULT_PREVIEW_IMAGES);
    const result = await this.offerService.createOffer({
      ...body,
      userId: user._id,
      preview: randomPreviewImage,
    });

    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    req: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = req.params;
    const currentOffer = await this.offerService.findById(offerId);

    if (req.user._id !== currentOffer?.userId._id.toString()) {
      throw new HttpError(
        StatusCodes.LOCKED,
        'This is not your offer',
        'OfferController'
      );
    }

    const offer = await this.offerService.deleteByOfferId(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {
      body,
      params,
      user,
    }: Request<ParamsOfferDetails, UnknownRecord, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const currentOffer = await this.offerService.findById(params.offerId);

    if (user._id !== currentOffer?.userId._id.toString()) {
      throw new HttpError(
        StatusCodes.LOCKED,
        'This is not your offer',
        'OfferController'
      );
    }
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
    req: Request<ParamsGetPremium>,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.findPremiumOffers(
      req.params.cityName,
      req.user?._id
    );
    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Premium offer with city ${req.params.cityName} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async showFavorite(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavoritesByUserId(req.user._id);

    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Favorite offers not found',
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.addFavorite(
      req.user._id,
      req.params.offerId
    );

    this.ok(res, fillDTO(SaveOfferRdo, offer));
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.removeFavorite(
      req.user._id,
      req.params.offerId
    );

    this.noContent(res, fillDTO(OfferRdo, offer));
  }

  public async uploadPrevImage(
    req: Request<ParamsOfferDetails>,
    res: Response
  ) {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    if (req.user._id !== offer?.userId._id.toString()) {
      throw new HttpError(
        StatusCodes.LOCKED,
        'This is not your offer',
        'OfferController'
      );
    }
    const updateDto = { preview: req.file?.filename };
    await this.offerService.updateByOfferId(offerId, updateDto);

    this.created(res, fillDTO(UploadPreviewRdo, updateDto));
  }

  public async uploadImages(req: Request<ParamsOfferDetails>, res: Response) 
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    if (req.user._id !== offer?.userId._id.toString()) {
      throw new HttpError(
        StatusCodes.LOCKED,
        'This is not your offer',
        'OfferController'
      );
    }
    const fileArray = req.files as Array<Express.Multer.File>;
    const fileNames = fileArray.map((file) => file.filename);
    const updateDto = { photos: fileNames };
    await this.offerService.updateByOfferId(offerId, updateDto);
    this.created(res, fillDTO(UploadImagesRdo, updateDto));
  }
}
