import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * `JwtStrategy` required `ConfigService` to be exists in scope
 * `betterAuth.url` is required in order to override the default `http://localhost:3000`
 **/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(readonly config: ConfigService) {
		super({
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: `${config.get('betterAuth.url', 'http://localhost:4000')}/api/auth/jwks`,
			}),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	validate(payload: Express.User) {
		return payload;
	}
}
