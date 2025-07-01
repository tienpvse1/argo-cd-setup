import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';
import { Request } from 'express';

type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

type LoginInput = {
	email: string;
	password: string;
};

export abstract class AuthOutboundPort {
	abstract login(input: LoginInput): Promise<AuthEntity>;
	abstract register(input: RegisterInput): Promise<AuthEntity>;
	abstract logout(request: Request): Promise<boolean>;
	abstract updateRole(userId: string, role: string): Promise<boolean>;
}
