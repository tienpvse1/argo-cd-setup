import { z } from 'zod';

export const SearchUserSchema = z.object({
	q: z.string().optional(),
	limit: z.number().int().min(1).max(50).optional(),
	offset: z.number().int().min(0).optional(),
});

export type ValidatedSearchUserInput = z.infer<typeof SearchUserSchema>;
