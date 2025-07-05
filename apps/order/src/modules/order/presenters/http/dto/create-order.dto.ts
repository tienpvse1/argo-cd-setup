import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateOrderSchema = z.object({
	items: z.array(
		z.object({
			productId: z.string(),
			quantity: z.number(),
		}),
	),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
