import { type MetadataRoute } from 'next';

import { ROUTES } from '@/routes';

const sitemap = (): MetadataRoute.Sitemap => {
	return [
		{
			url: 'https://pulse-connect-lyart.vercel.app/',
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.CONNECTIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.MESSAGES}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.NOTIFICATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.PROFILE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.ABOUT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.FAQ}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.CONTACT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.TERMS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.PRIVACY}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.ROOT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.GENERAL.ACCOUNT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.GENERAL.NOTIFICATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.GENERAL.APPEARANCE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.GENERAL.LANGUAGE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.ACCOUNT.INTEGRATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.ACCOUNT.EMAIL}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.ACCOUNT.PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 0.75,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.ACCOUNT.DISABLE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.SETTINGS.OTHERS.HELP}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.AUTH.SIGNIN}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.AUTH.SIGNUP}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.AUTH.SIGNOUT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.AUTH.FORGOT_PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
		{
			url: `https://pulse-connect-lyart.vercel.app/${ROUTES.AUTH.RESET_PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'never',
			priority: 0.5,
		},
	];
};

export default sitemap;
