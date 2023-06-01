import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  createOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateByOfferId(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findOffers(count?: number): Promise<DocumentType<OfferEntity>[]>;
  findByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumOffers(
    cityName: string,
    count?: number
  ): Promise<DocumentType<OfferEntity>[]>;
  findFavoriteOffers(count?: number): Promise<DocumentType<OfferEntity>[]>;
  setFavoriteStatusOffer(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
