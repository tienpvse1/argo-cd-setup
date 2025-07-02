import {
	AbilityBuilder,
	createMongoAbility,
	ExtractSubjectType,
	Subject,
} from '@casl/ability';
import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PolicyArgs, PolicyKey } from './permission.decorator';
import { PermissionFromDB, PermissionsInjectToken } from './permission.module';

@Injectable()
export class PolicyGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		@Inject(PermissionsInjectToken)
		private readonly permission: PermissionFromDB[],
	) {}
	canActivate(context: ExecutionContext) {
		const policy = this.reflector.getAllAndOverride<PolicyArgs>(PolicyKey, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!policy || !policy.permissions) {
			return true;
		}

		const user = context.switchToHttp().getRequest<Request>().user;
		if (!user) {
			return false;
		}

		const ability = this.createForUser(user);
		user.ability = ability;

		if (policy.requireAll) {
			return policy.permissions.every((permission) =>
				ability.can(permission.can, permission.subject),
			);
		}
		return policy.permissions.some((permission) =>
			ability.can(permission.can, permission.subject),
		);
	}

	private createForUser(user: Express.User | undefined) {
		const { can, build } = new AbilityBuilder(createMongoAbility);

		this.permission.forEach((permission) => {
			if (
				user?.role === permission.name &&
				permission.can &&
				permission.subject
			) {
				can(permission.can, permission.subject);
			}
		});

		return build({
			detectSubjectType: (item: { constructor: ExtractSubjectType<Subject> }) =>
				item.constructor,
		});
	}
}
