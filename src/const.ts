import { City } from './types/city-type.enum.js';

export const RANGE_COORDINATES_VALUE = 0.05;

export const enum OfferRatingValue {
  min = 0,
  max = 5,
  numAfterDigits = 0,
}

export const enum CommentCountValue {
  min = 3,
  max = 20,
}

export const enum CommentTextLength {
  min = 5,
  max = 1024,
}

export const enum OfferRoomsCount {
  min = 1,
  max = 8,
}

export const enum OfferGuestCount {
  min = 1,
  max = 10,
}

export const enum OfferPriceValue {
  min = 100,
  max = 100000,
}

export const enum OfferTitleLength {
  min = 10,
  max = 100,
}

export const enum OfferDescriptionLength {
  min = 20,
  max = 1024,
}

export const enum UserNameLingth {
  min = 1,
  max = 15,
}

export const enum UserPasswordLength {
  min = 6,
  max = 12,
}

export const OFFER_PHOTOS_COUNT = 6;

export const CityLocation = {
  [City.Paris]: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  [City.Cologne]: {
    latitude: 50.938361,
    longitude: 6.959974,
  },
  [City.Brussels]: {
    latitude: 50.846557,
    longitude: 4.351697,
  },
  [City.Amsterdam]: {
    latitude: 52.370216,
    longitude: 4.895168,
  },
  [City.Hamburg]: {
    latitude: 53.550341,
    longitude: 10.000654,
  },
  [City.Dusseldorf]: {
    latitude: 51.225402,
    longitude: 6.776314,
  },
};
