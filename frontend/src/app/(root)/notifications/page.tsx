import { Check, Trash2 } from 'lucide-react';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import Notification from '@/components/Notification/Notification';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Pulse Connect - Notifications',
};

const NotificationsPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-row items-center justify-between align-middle'>
				<div className='flex flex-row items-center justify-between space-x-2 align-middle'>
					<h1 className='text-xl font-semibold'>Notifications</h1>
					<span className='text-xl font-semibold text-primary'>
						9
					</span>
				</div>
				<div className='flex flex-row items-center justify-between space-x-2 align-middle'>
					<Button variant='outline' size='icon'>
						<Check className='h-4 w-4' />
					</Button>
					<Button variant='outline' size='icon'>
						<Trash2 className='h-4 w-4' />
					</Button>
				</div>
			</div>
			<div className='flex w-full flex-col items-start justify-between space-y-8 align-middle'>
				<h2 className='text-lg font-medium'>New</h2>
				<Notification
					image={''}
					firstName={'John'}
					lastName={'Doe'}
					message={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
					}
					time={'2 hours ago'}
					viewed={false}
				/>
				<Notification
					image={''}
					firstName={'John'}
					lastName={'Doe'}
					message={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
					}
					time={'2 hours ago'}
					viewed={false}
				/>
				<Notification
					image={''}
					firstName={'John'}
					lastName={'Doe'}
					message={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
					}
					time={'2 hours ago'}
					viewed={false}
				/>
				<h2 className='text-lg font-medium'>Old</h2>
				<Notification
					image={''}
					firstName={'John'}
					lastName={'Doe'}
					message={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
					}
					time={'2 hours ago'}
					viewed={false}
				/>
				<Notification
					image={''}
					firstName={'John'}
					lastName={'Doe'}
					message={
						'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
					}
					time={'2 hours ago'}
					viewed={false}
				/>
			</div>
		</Fragment>
	);
};

export default NotificationsPage;
