import {
	AbilityBuilder,
	createMongoAbility,
	ExtractSubjectType,
} from '@casl/ability';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppAbility, Subjects } from './permission';
import { PolicyArgs, PolicyKey } from './permission.decorator';

@Injectable()
export class PolicyGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
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
		const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

		if (user?.isAdmin) {
			can('manage', 'all');
		} else {
			can('read', 'all');
		}

		return build({
			detectSubjectType: (item: {
				constructor: ExtractSubjectType<Subjects>;
			}) => item.constructor,
		});
	}
}
