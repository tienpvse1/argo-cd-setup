import { Policy } from '@auth/permission/permission.decorator';
import { SearchUserQuery } from '@modules/user/domains/queries/search-user.query';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly queriesBus: QueryBus) {}

	@Get()
	@Policy({ permissions: [{ can: 'manage', subject: 'user' }] })
	findAll(@Query() input: SearchUserDto) {
		return this.queriesBus.execute(
			new SearchUserQuery(input.offset, input.limit, input.q),
		);
	}
}
