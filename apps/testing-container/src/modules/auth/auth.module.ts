import { Module } from '@nestjs/common';
import { AuthApplicationModule } from './applications/auth.application-module';
import { JwtStrategy } from './guards/auth.strategy';
import { AuthController } from './presenters/http/auth.controller';

@Module({
	imports: [AuthApplicationModule],
	providers: [JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
