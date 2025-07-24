export abstract class NotificationPayload {
	abstract getAddress(payload: Record<string, unknown>): string;
	abstract getMessage(payload: Record<string, unknown>): unknown;
}
