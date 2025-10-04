import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetService {
  getHello(hola?): string {
    return 'Hello World!' || hola;
  }
}
