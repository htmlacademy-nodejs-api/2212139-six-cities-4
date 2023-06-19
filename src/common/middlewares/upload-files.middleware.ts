import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import mime from 'mime-types';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { OFFER_PHOTOS_COUNT } from '../../const.js';

export class UploadFilesMiddleware implements MiddlewareInterface {
  constructor(private uploadDirectory: string, private fieldName: string) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        console.log(file);
        callback(null, `${filename}.${extension}`);
      },
    });
    console.log(`UploadFilesMiddleware 24: ${this.fieldName}`);

    const fileUploadMiddleware = multer({ storage }).array(
      this.fieldName,
      OFFER_PHOTOS_COUNT
    );
    fileUploadMiddleware(req, res, next);
  }
}
