export class User {
	id: number;
	firstName: string;
	metadata: {
		loginAt: Date;
		ip: string | null;
	};
}
