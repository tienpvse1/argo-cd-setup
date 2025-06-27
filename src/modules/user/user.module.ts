import { Module } from '@nestjs/common';
import { UserController } from './presenters/http/user.controller';
import { UserApplicationModule } from './applications/user.application-module';

@Module({
	imports: [UserApplicationModule],
	controllers: [UserController],
})
export class UserModule {}
