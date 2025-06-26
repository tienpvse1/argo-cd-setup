import { BetterAuthModule, BetterAuthToken } from '@auth';
import { UserService } from '@modules/user/applications/user.service';
import { Body, Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { AddReferralPartnerDto } from './dto/add-user.dto';
import { UserResponse } from './response/user.response';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		@Inject(BetterAuthToken)
		private readonly betterAuth: ReturnType<typeof BetterAuthModule.initAuth>,
	) {}

	@Get()
	@ZodSerializerDto(UserResponse)
	findAll() {
		return this.userService.findAll();
	}

	@Post()
	createReferalPartner(@Body() dto: AddReferralPartnerDto) {}

	@Get('/session')
	session(@Headers() header: any) {
		return this.betterAuth.api.getSession({
			headers: header,
		});
	}

	@Post('/auth')
	login(@Headers() header: any) {
		return this.betterAuth.api.signInEmail({
			headers: header,
			body: {
				email: 'good66612@gmail.com',
				password: 'Username666',
			},
		});
	}

	@Post('/signup')
	signup(@Headers() header: any) {
		return this.betterAuth.api.signUpEmail({
			headers: header,
			body: {
				email: 'good66613@gmail.com',
				password: 'Username666',
				name: 'tien again',
			},
		});
	}
}
