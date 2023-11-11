import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import {
	type SettingsItemProps,
	settingsItems,
} from '@/components/Settings/settings-items';
import SettingsItem from '@/components/Settings/SettingsItem';

export const metadata: Metadata = {
	title: 'Pulse Connect - Settings',
};

const SettingsPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-row items-center justify-between align-middle min-h-[40px]'>
				<h1 className='text-xl font-semibold'>Settings</h1>
			</div>
			<div className='flex w-full flex-col items-start justify-between space-y-8 align-middle'>
				{Object.keys(settingsItems).map(
					(categoty: string, index: number) => (
						<div
							key={`${categoty}-${index}`}
							className='flex w-full flex-col items-start justify-between space-y-4 align-middle'>
							<span className='text-sm text-muted-foreground'>
								{categoty}
							</span>
							{settingsItems[categoty]?.map(
								(item: SettingsItemProps, index: number) => (
									<SettingsItem
										key={`${item.title}-${index}`}
										href={item.href}
										icon={item.icon}
										title={item.title}
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
