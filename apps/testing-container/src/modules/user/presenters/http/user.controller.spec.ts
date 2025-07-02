import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { vi } from 'vitest'
import { QueryBus } from '@nestjs/cqrs';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
		}).useMocker(token => {
			if (token == QueryBus) return {
				publish: vi.fn()
			}
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
