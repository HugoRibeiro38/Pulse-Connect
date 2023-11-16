import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { SettingsItem } from '@/components/Settings';
import { Title } from '@/components/Title';
import { Button } from '@/components/ui/button';
import { type SettingsItemProps, settingsItems } from '@/data/settings';
import { APP_ROUTES } from '@/routes/app';

export const metadata: Metadata = {
	title: 'Pulse Connect - Settings',
};

const SettingsPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex flex-row items-center justify-between gap-x-4'>
				<Button variant='ghost' size='icon' asChild>
					<Link href={APP_ROUTES.HOME}>
						<ArrowLeft />
					</Link>
				</Button>
				<Title title='Settings' />
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
										subLabel,
										icon,
									}: SettingsItemProps,
									index: number,
								) => (
									<SettingsItem
										key={`${label}-${index}`}
										href={href}
										label={label}
										subLabel={subLabel}
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
