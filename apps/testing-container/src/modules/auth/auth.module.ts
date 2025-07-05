import { Module } from '@nestjs/common';
import { AuthApplicationModule } from './applications/auth.application-module';
import { AuthController } from './presenters/http/auth.controller';

@Module({
	imports: [AuthApplicationModule],
	controllers: [AuthController],
})
export class AuthModule {}
