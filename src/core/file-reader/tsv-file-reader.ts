import { readFileSync } from 'node:fs';
import { City } from '../../types/city-type.enum';
import { Feature } from '../../types/feature-type.enum';
import { OfferType } from '../../types/offer-type.enum';
import { Offer } from '../../types/offer.type';
import { FileReaderInterface } from './file-reader.interface';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title, description, createdDate, cityName,
        preview, photos, premium, favorite, rating,
        offerType, rooms, guests, price, features, name,
        email, avatarUrl, password, userType, commentsCount,
        latitude, longitude,
      ]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        cityName: City[cityName as keyof typeof City],
        preview,
        photos: photos.split(';'),
        isPremium: !!premium,
        isFavorite: !!favorite,
        rating: Number.parseInt(rating, 10),
        offerType: OfferType[offerType as keyof typeof OfferType],
        roomsCount: Number.parseInt(rooms, 10),
        guestsCount: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        features: features.split(';').map(
          (feature) => Feature[feature as keyof typeof Feature]),
        user: {
          name,
          email,
          avatarUrl,
          password,
          type: userType as 'pro' | 'regular',
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        address: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude)
        }
      }));
  }
}
