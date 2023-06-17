import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const VALID_IMAGE_FORMATS = ['.jpg', '.png'];

@ValidatorConstraint({ name: 'ValidImageFormat' })
export class ValidImageFormat implements ValidatorConstraintInterface {
  validate(image: string) {
    return VALID_IMAGE_FORMATS.some((format) => image.endsWith(format));
  }

  defaultMessage(): string {
    return `Image's format is not valid. Allowed formats are: ${VALID_IMAGE_FORMATS}`;
  }
}
