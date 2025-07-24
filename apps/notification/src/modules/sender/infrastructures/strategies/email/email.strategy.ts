import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import { Notifier } from '../notifier';
import { NotificationPayload } from '../receipient';

@Injectable()
export class EmailStrategy implements Notifier {
	private transporter: Transporter;

	constructor(
		readonly config: ConfigService,
		private payloadAdapter: NotificationPayload,
	) {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: config.get('smtp.user'),
				pass: config.get('smtp.password'),
			},
		});
	}

	async send(payload: Record<string, unknown>): Promise<boolean> {
		try {
			await this.transporter.sendMail({
				from: 'Notification Service',
				to: this.payloadAdapter.getAddress(payload),
				subject: 'Order created',
				html: this.payloadAdapter.getMessage(payload) as string,
			});
			return true;
		} catch {
			return false;
		}
	}
}
