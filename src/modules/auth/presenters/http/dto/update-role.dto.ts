import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateRoleSchema = z.object({
	userId: z.string(),
	role: z.enum(['regular-user', 'admin']).default('regular-user'),
});

export class UpdateRoleDto extends createZodDto(UpdateRoleSchema) {}
