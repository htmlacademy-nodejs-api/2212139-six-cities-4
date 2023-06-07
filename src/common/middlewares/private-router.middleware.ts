import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { MiddlewareInterface } from '../../types/middleware.interface.js';

export class PrivateRouterMiddleware implements MiddlewareInterface {
  public async execute(
    { user }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouterMiddleware'
      );
    }

    return next();
  }
}
