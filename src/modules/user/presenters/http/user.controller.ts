import { UserService } from '@modules/user/applications/user.service';
import { Controller, Get } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { UserResponse } from './response/user.response';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ZodSerializerDto(UserResponse)
	findAll() {
		return this.userService.findAll();
	}
}
