import { IsPublic } from '@internal';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Span } from 'nestjs-otel';
import { AppService } from './app.service';

@ApiBearerAuth()
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@Span()
	@IsPublic()
	getHello() {
		return this.appService.getHello();
	}
}
