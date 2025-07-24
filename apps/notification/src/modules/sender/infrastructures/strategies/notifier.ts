export type Payload = {
	message: string;
};

export abstract class Notifier {
	abstract send(payload: Record<string, unknown>): Promise<boolean>;
}
