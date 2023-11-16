import {
	AtSign,
	Bell,
	Contrast,
	Cookie,
	HeartCrack,
	HeartHandshake,
	HelpCircle,
	Info,
	KeyRound,
	Languages,
	LogOut,
	type LucideIcon,
	Mail,
	User,
} from 'lucide-react';

import { APP_ROUTES } from '@/routes/app';

export type SettingsItemProps = {
	href: string;
	label: string;
	subLabel: string;
	icon: LucideIcon;
};

export type SettingsItemsProps = Record<string, SettingsItemProps[]>;

export const settingsItems: SettingsItemsProps = {
	General: [
		{
			href: APP_ROUTES.SETTINGS.GENERAL.ACCOUNT,
			label: 'Account Informations',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: User,
		},
		{
			href: APP_ROUTES.SETTINGS.GENERAL.NOTIFICATIONS,
			label: 'Notifications',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: Bell,
		},
		{
			href: APP_ROUTES.SETTINGS.GENERAL.APPEARANCE,
			label: 'Appearance',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: Contrast,
		},
		{
			href: APP_ROUTES.SETTINGS.GENERAL.LANGUAGE,
			label: 'Language',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: Languages,
		},
	],
	Account: [
		{
			href: APP_ROUTES.SETTINGS.ACCOUNT.INTEGRATIONS,
			label: 'Integrations',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: AtSign,
		},
		{
			href: APP_ROUTES.SETTINGS.ACCOUNT.EMAIL,
			label: 'Change Email',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: Mail,
		},
		{
			href: APP_ROUTES.SETTINGS.ACCOUNT.PASSWORD,
			label: 'Change Password',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: KeyRound,
		},
		{
			href: APP_ROUTES.SETTINGS.ACCOUNT.DISABLE,
			label: 'Disable Account',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: HeartCrack,
		},
	],
	Others: [
		{
			href: APP_ROUTES.ABOUT,
			label: 'About Us',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: Info,
		},
		{
			href: APP_ROUTES.SETTINGS.OTHERS.HELP,
			label: 'Help & Support',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: HelpCircle,
		},
		{
			href: APP_ROUTES.TERMS,
			label: 'Terms & Conditions',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: HeartHandshake,
		},
		{
			href: APP_ROUTES.PRIVACY,
			label: 'Privacy Policy',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: Cookie,
		},
		{
			href: APP_ROUTES.AUTH.SIGNOUT,
			label: 'Sign Out',
			subLabel:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			icon: LogOut,
		},
	],
};
