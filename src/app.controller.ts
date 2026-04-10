import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      name: 'Portfolio API',
      status: 'online',
      message: '🚀 Api está em órbita',
      version: '1.0.0',
    };
  }
}
