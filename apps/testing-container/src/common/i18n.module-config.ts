import path from 'node:path';
import {
	AcceptLanguageResolver,
	I18nModule as BaseI18nModule,
	CookieResolver,
	HeaderResolver,
	QueryResolver,
} from 'nestjs-i18n';

export const I18nModule = BaseI18nModule.forRoot({
	fallbackLanguage: 'en',
	typesOutputPath: path.join(
		__dirname,
		'../../../apps/testing-container/src/generated/i18n.generated.ts',
	),
	loaderOptions: {
		path: path.join(__dirname, '..', 'testing-container/i18n/'),
		watch: true,
	},
	resolvers: [
		new QueryResolver(['lang', 'l']),
		new HeaderResolver(['x-custom-lang']),
		new CookieResolver(),
		AcceptLanguageResolver,
	],
});
