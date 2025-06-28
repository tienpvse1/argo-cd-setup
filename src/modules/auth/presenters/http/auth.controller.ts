import { IsPublic } from '@common/decorators/is-public.decorator';
import { AuthService } from '@modules/auth/applications/auth.service';
import { LoginCommand } from '@modules/auth/domains/commands/login.command';
import { SignupCommand } from '@modules/auth/domains/commands/register.command';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@IsPublic()
	async login(@Body() input: LoginDto) {
		return this.authService.login(
			new LoginCommand(input.email, input.password),
		);
	}

	@Post('sign-up')
	@IsPublic()
	async signUp(@Body() input: SignUpDto) {
		return this.authService.register(
			new SignupCommand(input.name, input.email, input.password),
		);
	}
}
