import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloWorldController {
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
