import { Query } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user';

export class SearchUserQuery extends Query<UserEntity[]> {
	offset: number;
	limit: number;
	q: string;

	constructor(
		offset: number | undefined,
		limit: number | undefined,
		q: string | undefined,
	) {
		super();
		this.offset = offset ?? 0;
		this.limit = limit ?? 10;
		this.q = q ?? '';
	}
}
