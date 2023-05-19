import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferIntity>>;
  findById(offerId: string): Promise<DocumentType<OfferIntity> | null>;
}
