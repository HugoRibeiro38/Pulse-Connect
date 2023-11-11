import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		NEXTAUTH_SECRET:
			process.env.NODE_ENV === 'production'
				? z.string()
				: z.string().optional(),
		NEXTAUTH_URL: z.preprocess(
			(str) => process.env.VERCEL_URL ?? str,
			process.env.VERCEL ? z.string() : z.string().url(),
		),
		API_URL: z.string().url(),
		RECAPTCHA_SECRET_KEY: z.string(),
		MAINTENANCE_MODE: z.enum(['true', 'false']).default('false'),
	},
	client: {
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
		NEXT_PUBLIC_ENCRYPTION_KEY: z.string(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		API_URL: process.env.API_URL,
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
			process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
		RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
		NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
		MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
