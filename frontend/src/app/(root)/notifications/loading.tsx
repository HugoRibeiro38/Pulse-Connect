import { Check, Trash2 } from 'lucide-react';
import { Fragment } from 'react';

import NotificationSkeleton from '@/components/Notification/NotificationSkeleton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Loading: React.FunctionComponent = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-row items-center justify-between align-middle'>
				<div className='flex flex-row items-center justify-between space-x-2 align-middle'>
					<h1 className='text-xl font-semibold'>Notifications</h1>
					<Skeleton className='h-5 w-2' />
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
				<NotificationSkeleton />
				<NotificationSkeleton />
				<NotificationSkeleton />
				<h2 className='text-lg font-medium'>Old</h2>
				<NotificationSkeleton />
				<NotificationSkeleton />
			</div>
		</Fragment>
	);
};

export default Loading;
