import { Policy } from '@auth/permission/permission.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

@ApiBearerAuth()
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@Policy({ permissions: [{ can: 'manage', subject: 'all' }] })
	getHello() {
		return this.appService.getHello();
	}
}
