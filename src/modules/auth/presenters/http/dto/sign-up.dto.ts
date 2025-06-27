import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SignupValidateSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string(),
});

export class SignUpDto extends createZodDto(SignupValidateSchema) {}
