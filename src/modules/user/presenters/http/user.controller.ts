import { UserService } from '@modules/user/applications/user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}
}
