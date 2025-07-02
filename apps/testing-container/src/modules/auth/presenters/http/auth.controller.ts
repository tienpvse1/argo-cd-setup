import { Policy } from '@auth/permission/permission.decorator';
import { IsPublic } from '@common/decorators/is-public.decorator';
import { LoginCommand } from '@modules/auth/domains/commands/login.command';
import { SignupCommand } from '@modules/auth/domains/commands/register.command';
import { UpdateRoleCommand } from '@modules/auth/domains/commands/update-role.command';
import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post('login')
	@IsPublic()
	async login(@Body() input: LoginDto) {
		return this.commandBus.execute(
			new LoginCommand(input.email, input.password),
		);
	}

	@Post('sign-up')
	@IsPublic()
	async signUp(@Body() input: SignUpDto) {
		return this.commandBus.execute(
			new SignupCommand(input.name, input.email, input.password),
		);
	}

	@Patch('update-role')
	@Policy({ permissions: [{ can: 'manage', subject: 'all' }] })
	async updateRole(@Body() input: UpdateRoleDto) {
		return this.commandBus.execute(
			new UpdateRoleCommand(input.userId, input.role),
		);
	}
}
