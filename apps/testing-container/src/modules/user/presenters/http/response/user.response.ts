import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserMetadataSchema = z.object({
	loginAt: z.string().datetime().optional(),
	ip: z.string().ip().optional(),
});

export const UserResponseSchema = z.object({
	id: z.number().int(),
	firstName: z.string(),
	metadata: UserMetadataSchema,
});

export class UserResponse extends createZodDto(UserResponseSchema) {}
