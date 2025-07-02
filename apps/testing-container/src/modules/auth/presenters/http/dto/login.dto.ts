import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginValidateSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export class LoginDto extends createZodDto(LoginValidateSchema) {}
