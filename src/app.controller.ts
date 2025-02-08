import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @Get 内に helloworld と記載することで、
    // http://localhost:7071/api/helloworld のようなエンドポイントでアクセス可能になる
    @Get('helloworld')
    getHello(): string {
        return this.appService.getHello();
    }
}

