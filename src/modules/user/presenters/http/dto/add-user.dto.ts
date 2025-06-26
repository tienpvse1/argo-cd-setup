import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Gender } from './gender.enum';

export const AddReferralPartnerSchema = z.object({
	firstName: z.string().min(2).default('John Doe'),
	gender: z.nativeEnum(Gender),
	metadata: z
		.object({
			loginAt: z.string().optional(),
			ip: z.string().ip().optional(),
			agent: z.string().optional(),
			plan: z.string().optional(),
		})
		.optional(),
});

export class AddReferralPartnerDto extends createZodDto(
	AddReferralPartnerSchema,
) {}
