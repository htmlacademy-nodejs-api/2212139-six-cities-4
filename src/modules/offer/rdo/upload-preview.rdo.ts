import { Expose } from 'class-transformer';

export default class UploadPreviewRdo {
  @Expose()
  public preview!: string;
}
