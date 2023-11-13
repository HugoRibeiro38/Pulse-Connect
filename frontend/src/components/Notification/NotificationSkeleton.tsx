import { Skeleton } from '@/components/ui/skeleton';

const NotificationSkeleton: React.FunctionComponent = (): React.ReactNode => {
	return (
		<div className='flex w-full flex-row items-center justify-start space-x-2 align-middle'>
			<Skeleton className='h-10 w-10 rounded-full' />
			<div className='flex w-full flex-col items-start justify-between space-y-1 align-middle'>
				<div className='flex w-full flex-row items-center justify-start space-x-4 align-middle'>
					<Skeleton className='h-4 w-32' />
					<Skeleton className='h-4 w-64' />
				</div>
				<Skeleton className='h-3 w-16' />
			</div>
		</div>
	);
};

export default NotificationSkeleton;
