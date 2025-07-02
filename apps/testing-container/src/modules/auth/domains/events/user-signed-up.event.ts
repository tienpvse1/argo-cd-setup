export class UserSignedUpEvent {
	userId: string;

	constructor(userId: string) {
		this.userId = userId;
	}
}
