import { createMock } from '@golevelup/ts-vitest';
import { KyselyInjectToken } from '@kysely';
import { Database } from '@kysely/schema';
import { Test, TestingModule } from '@nestjs/testing';
import { Kysely } from 'kysely';
import { vi } from 'vitest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
	let appController: AppController;
	let appService: AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		})
			.useMocker((token) => {
				if (token === KyselyInjectToken) {
					return createMock<Kysely<Database>>({});
				}
			})
			.compile();

		appController = app.get<AppController>(AppController);
		appService = app.get<AppService>(AppService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('root', () => {
		it('should return list of user by calling getHello', async () => {
			vi.spyOn(appService, 'getHello').mockResolvedValue([]);
			expect(appController.getHello()).resolves.toMatchObject([]);
		});
	});
});
