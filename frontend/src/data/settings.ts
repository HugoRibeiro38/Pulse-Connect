import {
	AtSign,
	Bell,
	Contrast,
	Cookie,
	HeartCrack,
	HeartHandshake,
	KeyRound,
	Languages,
	LogOut,
	type LucideIcon,
	Mail,
	User,
} from 'lucide-react';

import { APP_ROUTES } from '@/routes/APP';

export type SettingsItemProps = {
	url: string;
	title: string;
	text: string;
	icon: LucideIcon;
};

export type SettingsItemsProps = Record<string, SettingsItemProps[]>;

export const settingsItems: SettingsItemsProps = {
	General: [
		{
			url: APP_ROUTES.SETTINGS.GENERAL.ACCOUNT,
			title: 'Account Informations',
			text: 'Update your account information and personalize your profile.',
			icon: User,
		},
		{
			url: APP_ROUTES.SETTINGS.GENERAL.NOTIFICATIONS,
			title: 'Notifications',
			text: 'Configure your notification settings for a personalized experience.',
			icon: Bell,
		},
		{
			url: APP_ROUTES.SETTINGS.GENERAL.APPEARANCE,
			title: 'Appearance',
			text: 'Customize the appearance of the application to suit your preferences.',
			icon: Contrast,
		},
		{
			url: APP_ROUTES.SETTINGS.GENERAL.LANGUAGE,
			title: 'Language',
			text: 'Choose your preferred language for the application interface.',
			icon: Languages,
		},
	],
	Account: [
		{
			url: APP_ROUTES.SETTINGS.ACCOUNT.INTEGRATIONS,
			title: 'Integrations',
			text: 'Integrate third-party services to enhance your account functionality.',
			icon: AtSign,
		},
		{
			url: APP_ROUTES.SETTINGS.ACCOUNT.EMAIL,
			title: 'Change Email',
			text: 'Update your email address associated with your account.',
			icon: Mail,
		},
		{
			url: APP_ROUTES.SETTINGS.ACCOUNT.PASSWORD,
			title: 'Change Password',
			text: 'Secure your account by regularly updating your password.',
			icon: KeyRound,
		},
		{
			url: APP_ROUTES.SETTINGS.ACCOUNT.DISABLE,
			title: 'Disable Account',
			text: 'Temporarily disable your account while retaining your data.',
			icon: HeartCrack,
		},
	],
	Others: [
		{
			url: APP_ROUTES.TERMS,
			title: 'Terms & Conditions',
			text: 'Read and understand the terms and conditions governing the use of the application.',
			icon: HeartHandshake,
		},
		{
			url: APP_ROUTES.PRIVACY,
			title: 'Privacy Policy',
			text: 'Understand how your data is handled and protected by reviewing our privacy policy.',
			icon: Cookie,
		},
		{
			url: APP_ROUTES.AUTH.SIGN_OUT,
			title: 'Sign Out',
			text: 'Securely sign out of your account to protect your privacy.',
			icon: LogOut,
		},
	],
};
