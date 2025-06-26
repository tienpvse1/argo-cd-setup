import { Module } from '@nestjs/common';
import { UserController } from './presenters/http/user.controller';
import { UserService } from './applications/user.service';

@Module({
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
