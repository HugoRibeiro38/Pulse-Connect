import { type Metadata, type NextPage } from 'next/types';
import React, { Fragment } from 'react';

import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Notifications Settings',
};

const SettingsNotificationsPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.SETTINGS.ROOT} />
					<Title title='Notifications Settings' />
				</div>
				<Separator />
			</div>
		</Fragment>
	);
};

export default SettingsNotificationsPage;
