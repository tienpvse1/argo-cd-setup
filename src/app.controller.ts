import { Policy } from '@auth/permission/permission.decorator';
import { Controller, Get, Patch, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@Policy({ permissions: [{ can: 'manage', subject: 'all' }] })
	getHello() {
		return this.appService.getHello();
	}

	@Get('/new')
	getNewHello() {
		return this.appService.getHello();
	}

	@Post('/')
	createUser() {
		return this.appService.getHello();
	}

	@Patch('/')
	updateUser() {
		return this.appService.getHello();
	}
}
