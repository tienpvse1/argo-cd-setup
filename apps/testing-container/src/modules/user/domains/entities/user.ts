export class UserEntity {
	id: string;
	firstName: string;
	metadata: {
		loginAt: Date;
		ip: string | null;
	};
}
