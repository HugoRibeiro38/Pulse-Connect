import { type MetadataRoute } from 'next';

import { APP_ROUTES } from '@/routes/app';

const sitemap = (): MetadataRoute.Sitemap => {
	const URL = 'https://pulse-connect-lyart.vercel.app';

	return [
		{
			url: URL,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.CONNECTIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.MESSAGES}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.NOTIFICATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.PROFILE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `${URL}${APP_ROUTES.ABOUT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.SEARCH}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.FAQ}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `${URL}${APP_ROUTES.CONTACT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `${URL}${APP_ROUTES.TERMS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.PRIVACY}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.MAINTENANCE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ROOT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.ACCOUNT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.NOTIFICATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.APPEARANCE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.LANGUAGE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.INTEGRATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.EMAIL}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.DISABLE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.HELP}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.SIGNIN}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.SIGNUP}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.SIGNOUT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.FORGOT_PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.RESET_PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
	];
};

export default sitemap;
