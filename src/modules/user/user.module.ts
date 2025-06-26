import { Module } from '@nestjs/common';
import { UserService } from './applications/user.service';
import { UserController } from './presenters/http/user.controller';

@Module({
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
