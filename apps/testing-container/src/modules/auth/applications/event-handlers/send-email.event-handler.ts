import { UserSignedUpEvent } from '@modules/auth/domains/events/user-signed-up.event';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserSignedUpEvent)
export class SendEmailOnUserSignup implements IEventHandler<UserSignedUpEvent> {
	handle(event: UserSignedUpEvent) {
		Logger.debug(`Send email to${event.userId}`);
	}
}
