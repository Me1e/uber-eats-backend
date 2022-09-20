import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_MODULE_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_MODULE_OPTIONS)
    private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.secretKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.secretKey);
  }
}
