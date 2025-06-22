import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/env.config';
import { KyselyModule } from './kysely/kysely.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    KyselyModule.registerAsync({
      imports: [ConfigModule],
			inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          host: config.getOrThrow<string>('postgres.host'),
          port: config.getOrThrow<number>('postgres.port'),
          user: config.getOrThrow<string>('postgres.user'),
          password: config.getOrThrow<string>('postgres.password'),
          database: config.getOrThrow<string>('postgres.db'),
          max: config.get<number>('postgres.max'),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
