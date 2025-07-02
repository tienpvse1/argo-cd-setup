import { Module } from '@nestjs/common';
import { UserApplicationModule } from './applications/user.application-module';
import { UserController } from './presenters/http/user.controller';

@Module({
	imports: [UserApplicationModule],
	controllers: [UserController],
})
export class UserModule {}
