import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SearchUserSchema = z.object({
	q: z.string().optional().describe('search parameter'),
	offset: z.number().int().min(0).default(0).optional(),
	limit: z.number().int().max(50).default(10).optional(),
});

export class SearchUserDto extends createZodDto(SearchUserSchema) {}
