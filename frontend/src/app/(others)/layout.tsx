import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { Footer } from '@/components/layout/Footer';
import { ActionButton } from '@/components/shared/ActionButton';
import { APP_ROUTES } from '@/routes/app';

type OthersLayoutProps = {
	children: React.ReactNode;
};

const OthersLayout: React.FunctionComponent<OthersLayoutProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Fragment>
			<div className='mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-y-32 px-4 py-16 sm:px-6 lg:px-8'>
				<header className='flex w-full flex-row items-center justify-between'>
					<Link href={APP_ROUTES.HOME}>
						<Image
							src='assets/logo/Logo Transparent.svg'
							alt='Logo'
							width={128}
							height={32}
							className='dark:nightMode h-12 w-auto'
						/>
					</Link>
					<ActionButton />
				</header>
				<main>{children}</main>
			</div>
			<Footer />
		</Fragment>
	);
};

export default OthersLayout;
