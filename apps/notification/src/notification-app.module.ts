import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import config from './config';

@Module({
	imports: [
		CqrsModule.forRoot(),
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true,
		}),
	],
})
export class NotificationModule {}
