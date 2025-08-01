
**Tracing Library**

In order to add tracing/logging ability to your NestJS application, you can use this library. 
Currently it's hardcoded to use Opentelemetry protocol.

Steps to use:
1. Initialize opentelemetry at the root level of your application. Probably in main.ts

```ts
async function bootstrap() {
	const otel = initializeOtel({
		serviceName: '<service-name>',
		version: '<service-version>',
	});
    // noted that this is required
	otel.start();
    // other setup code...
	const app = await NestFactory.create(AppModule);
	await app.listen(port);
}
bootstrap();
```

2. Register Otelemetry module at root level module of your application. Probably in app.module.ts
```ts

@Module({
    imports: [
        // this is important
        OpenTelemetryModule.forRoot(),
        // in case you want to collect logs
        OtelLoggerModule.forRoot({
            resource: resourceFromAttributes({}),
        }),
    ],
})
export class AppModule {}
```

3. Optionally, you can override Nest default logger globally.

```ts
// main.ts
async function bootstrap() {
    // other codes
	const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(OTEL_LOGGER));
	await app.listen(port);
}
bootstrap();
```

```ts
// these will be logged in otlp
Logger.log('message');
Logger.debug('message');
Logger.verbose('message');
Logger.warn('message');
Logger.error('message');
```

