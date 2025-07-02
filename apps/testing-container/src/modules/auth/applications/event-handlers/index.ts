import { LoggingOnUserSignedUp } from './logging.event-handler';
import { SendEmailOnUserSignup } from './send-email.event-handler';

export const AuthEventHandlers = [SendEmailOnUserSignup, LoggingOnUserSignedUp];
