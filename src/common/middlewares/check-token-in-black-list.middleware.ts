import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BLOCKED_TOKENS } from '../../const.js';
import HttpError from '../../core/errors/http-error.js';
import { MiddlewareInterface } from '../../types/middleware.interface.js';

export class CheckTokenInBlackListMiddleware implements MiddlewareInterface {
  async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = String(req.headers.authorization?.split(' ')[1]);

    if (BLOCKED_TOKENS.has(token)) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'CheckTokenInBlackListMiddleware'
      );
    }

    return next();
  }
}
