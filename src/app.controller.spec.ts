import { createMock } from "@golevelup/ts-vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { Kysely } from "kysely";
import { vi } from "vitest";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KYSEKY_INJECT_TOKEN } from "./kysely/kysely.module";
import { Database } from "./kysely/schema";

describe("AppController", () => {
	let appController: AppController;
	let appService: AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		})
			.useMocker((token) => {
				if (token === KYSEKY_INJECT_TOKEN) {
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

	describe("root", () => {
		it("should return list of user by calling getHello", async () => {
			vi.spyOn(appService, "getHello").mockResolvedValue([]);
			expect(appController.getHello()).resolves.toMatchObject([]);
		});
	});
});
