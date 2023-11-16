import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';

import { buttonVariants } from '@/components/ui/button';
import { CONTACT_EMAIL } from '@/data/constants';
import { APP_ROUTES } from '@/routes/app';

export const metadata: Metadata = {
	title: 'Pulse Connect - Privacy Policy',
};

const PrivacyPage: NextPage = (): React.ReactNode => {
	return (
		<div className='mx-auto flex max-w-7xl flex-col items-start justify-center gap-y-8 px-4 py-16 sm:px-6 lg:px-8'>
			<div className='flex w-full flex-row items-center justify-between pb-8'>
				<Link href={APP_ROUTES.HOME}>
					<Image
						src='/logo/Logo Transparent Text Black.svg'
						alt='Logo'
						width={32}
						height={32}
						className='dark:nightMode h-12 w-auto'
					/>
				</Link>
				<Link
					href={APP_ROUTES.HOME}
					className={`${buttonVariants({ variant: 'default' })}`}>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Go back
				</Link>
			</div>
			<h1 className='text-4xl font-extrabold tracking-tight'>
				Privacy Policy
			</h1>
			<h2 className='text-3xl font-semibold tracking-tight'>
				1. Information Collection
			</h2>
			<p className='text-base font-normal leading-7'>
				1.1. Pulse Connect collects and stores the following types of
				data:
			</p>
			<ul className='ml-6 list-disc [&>li]:mt-2'>
				<li>Basic user information for authentication.</li>
				<li>
					Personal data provided by users during registration and use
					of the service.
				</li>
				<li>User-generated messages.</li>
			</ul>
			<h2 className='text-3xl font-semibold tracking-tight'>
				2. Data Security
			</h2>
			<p className='text-base font-normal leading-7'>
				2.1. We take data security seriously and employ measures such as
				encryption and access controls to protect user data.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				3. Social Media Connections
			</h2>
			<p className='text-base font-normal leading-7'>
				3.1. Users can connect their social media accounts like Twitter
				with their consent to import followers. No data from other
				social media accounts is shared without user permission.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				4. Messaging
			</h2>
			<p className='text-base font-normal leading-7'>
				4.1. Users can only communicate with other users they are
				connected with on Pulse Connect.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				5. Cookies and Local Storage
			</h2>
			<p className='text-base font-normal leading-7'>
				5.1. We use basic cookies for the functioning of the service.
				Local storage is used to store user preferences and settings.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				6. Google ReCaptcha V3
			</h2>
			<p className='text-base font-normal leading-7'>
				6.1. Google ReCaptcha V3 is used for forms to enhance security.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				7. Data Sharing
			</h2>
			<p className='text-base font-normal leading-7'>
				7.1. Pulse Connect does not sell or share user data with
				third-party buyers or partners.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				8. Changes to Privacy Policy
			</h2>
			<p className='text-base font-normal leading-7'>
				8.1. We may update this Privacy Policy. Users will be informed
				of changes, and continued use of the service after updates
				implies acceptance of the new policy.
			</p>
			<h2 className='text-3xl font-semibold tracking-tight'>
				9. Contact Information
			</h2>
			<p className='text-base font-normal leading-7'>
				For questions or concerns about your privacy and data, please
				contact us at{' '}
				<a
					href={`mailto:${CONTACT_EMAIL}?subject=Question about Terms and Conditions.`}
					className='text-primary'>
					{CONTACT_EMAIL}
				</a>
				.
			</p>
		</div>
	);
};

export default PrivacyPage;
