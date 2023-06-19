import { createSecretKey } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { jwtVerify } from 'jose';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly jwtSecret: string) {}

  public async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(
        token,
        createSecretKey(this.jwtSecret, 'utf-8')
      );

      req.user = { email: String(payload.email), id: String(payload.id) };
      return next();
    } catch (err) {
      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          'AuthenticateMiddleware'
        )
      );
    }
  }
}
