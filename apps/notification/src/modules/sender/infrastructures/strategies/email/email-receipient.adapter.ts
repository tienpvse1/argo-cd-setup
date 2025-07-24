import { NotificationPayload } from '../receipient';

type HasEmailAddress = {
	email: string;
};

type HasMessage = {
	message: string;
};

export class EmailPayload implements NotificationPayload {
	getAddress(payload: Record<string, unknown>): string {
		if (!this.isEmailPayload(payload))
			throw new Error('missing email attribute');
		return payload.email;
	}

	getMessage(payload: Record<string, unknown>) {
		if (!this.hasMessage(payload)) throw new Error('missing message attribute');
		return payload.message;
	}

	private isEmailPayload(
		payload: Record<string, unknown>,
	): payload is HasEmailAddress {
		if (!payload) return false;
		if (typeof payload.email !== 'string') return false;
		return true;
	}

	private hasMessage(payload: Record<string, unknown>): payload is HasMessage {
		if (!payload) return false;
		if (typeof payload.message !== 'string') return false;
		return true;
	}
}
