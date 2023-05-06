import dayjs from 'dayjs';
import { CityLocation, RANGE_COORDINATES_VALUE } from '../../const.js';
import { City } from '../../types/city-type.enum.js';

export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getPostDate(): string {
  const date = dayjs();
  date.subtract(generateRandomValue(100, 60000000), 's');
  return date.toISOString();
}

export function getBooleanValue(): boolean {
  return Math.random() >= 0.5;
}

export function getCoordinates(city: City): string[] {
  const lat: number =
    CityLocation[city].latitude -
    generateRandomValue(-RANGE_COORDINATES_VALUE, RANGE_COORDINATES_VALUE);

  const lon =
    CityLocation.Paris.longitude -
    generateRandomValue(-RANGE_COORDINATES_VALUE, RANGE_COORDINATES_VALUE);

  return [lat.toString(), lon.toString()];
}
