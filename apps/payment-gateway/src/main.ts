import { NestFactory } from '@nestjs/core';
import { PaymentGatewayModule } from './payment-gateway.module';

async function bootstrap() {
	const app = await NestFactory.create(PaymentGatewayModule);
	await app.listen(3000);
}
bootstrap();
