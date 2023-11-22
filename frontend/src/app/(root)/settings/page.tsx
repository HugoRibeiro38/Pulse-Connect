import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { SettingsItem } from '@/components/Settings';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { type SettingsItemProps, settingsItems } from '@/data/settings';
import { APP_ROUTES } from '@/routes/app';

export const metadata: Metadata = {
	title: 'Pulse Connect - Settings',
};

const SettingsPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.HOME} />
					<Title title='Settings' />
				</div>
				<Separator />
			</div>
			<div className='flex w-full flex-col items-start justify-between gap-8'>
				{Object.keys(settingsItems).map(
					(categoty: string, index: number) => (
						<div
							key={`${categoty}-${index}`}
							className='flex w-full flex-col items-start justify-between gap-y-4'>
							<h2 className='text-lg text-muted-foreground'>
								{categoty}
							</h2>
							{settingsItems[categoty]?.map(
								(
									{
										href,
										label,
										text,
										icon,
									}: SettingsItemProps,
									index: number,
								) => (
									<SettingsItem
										key={`${label}-${index}`}
										href={href}
										label={label}
										text={text}
										icon={icon}
									/>
								),
							)}
						</div>
					),
				)}
			</div>
		</Fragment>
	);
};

export default SettingsPage;
