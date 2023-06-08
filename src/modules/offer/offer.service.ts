import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, OFFER_PREMIUM_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async createOffer(
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async updateByOfferId(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    const newRating = await this.updateRating(offerId);
    return this.offerModel
      .findByIdAndUpdate(offerId, { ...dto, rating: newRating }, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async deleteByOfferId(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async find(
    userAuthorization?: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[]> {
    const limitNumber = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'favorites',
            localField: '_id',
            foreignField: 'offerId',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [
                      '$userId',
                      new mongoose.Types.ObjectId(userAuthorization),
                    ],
                  },
                },
              },
            ],
            as: 'result',
          },
        },
        { $addFields: { isFavorite: { $eq: [{ $size: '$result' }, 1] } } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $addFields: { userId: '$user' } },
        { $limit: +limitNumber },
        { $sort: { postDate: SortType.Down } },
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const newRating = await this.updateRating(offerId);

    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $set: { rating: newRating },
        $inc: { commentsCount: 1 },
      })
      .exec();
  }

  public async findByTitle(
    title: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ title }).exec();
  }

  public async findPremiumOffers(
    cityName: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFER_PREMIUM_COUNT;
    return this.offerModel
      .find({ isPremium: true, cityName: cityName }, {}, { limit })
      .sort({ postDate: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async findFavoriteOffers(
    count?: number
  ): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({ isFavorite: true }, {}, { limit })
      .sort({ postDate: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async setFavoriteStatusOffer(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const currentOffer = await this.offerModel.findById(offerId);

    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $set: { isFavorite: !currentOffer?.isFavorite },
      })
      .exec();
  }

  public async updateRating(offerId: string): Promise<number | null> {
    const currentOffer = await this.offerModel.findById(offerId);
    console.log(currentOffer);
    const offerWithNewRating = await this.offerModel.aggregate([
      { $match: { title: currentOffer?.title } },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          pipeline: [
            { $project: { rating: 1 } },
            {
              $group: {
                _id: null,
                ratingAvg: { $avg: '$rating' }
              }
            }
          ],
          as: 'result'
        }
      },
      { $unwind: '$result' },
      {
        $set: {
          rating: {
            $round: ['$result.ratingAvg', 1]
          }
        }
      },
      { $unset: 'result' }
    ]);

    return offerWithNewRating[0] ? offerWithNewRating[0].rating : 0;
  }
}
