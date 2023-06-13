import { Expose } from 'class-transformer';

export default class UploadImagesRdo {
  @Expose()
  public photos!: string[];
}
