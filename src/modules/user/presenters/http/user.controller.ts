import { UserService } from '@modules/user/applications/user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { AddReferralPartnerDto } from './dto/add-user.dto';
import { UserResponse } from './response/user.response';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ZodSerializerDto(UserResponse)
	findAll() {
		return this.userService.findAll();
	}

	@Post()
	createReferalPartner(@Body() dto: AddReferralPartnerDto) {}
}
