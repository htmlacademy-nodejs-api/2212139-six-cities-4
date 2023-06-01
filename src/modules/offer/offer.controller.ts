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
import * as core from 'express-serve-static-core';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';

type ParamsGetOffer = {
  offerId: string;
};

type ParamsGetPremium = {
  cityName: string;
};

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.showFavorite,
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.showPremium,
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });

    this.addRoute({
      path: '/premium/:cityName',
      method: HttpMethod.Get,
      handler: this.showPremium,
    });
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findByOfferId(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findOffers();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.createOffer(body);
    const offer = await this.offerService.findByOfferId(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteByOfferId(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );
    }

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {
      body,
      params,
    }: Request<
      core.ParamsDictionary | ParamsGetOffer,
      Record<string, unknown>,
      UpdateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateByOfferId(
      params.offerId,
      body
    );

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(params.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async showPremium(
    { params }: Request<core.ParamsDictionary | ParamsGetPremium>,
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
}
