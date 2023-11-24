import { Check } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/get-initials';

type NotificationProps = {
	image: string;
	firstName: string;
	lastName: string;
	message: string;
	time: string;
	viewed: boolean;
};

const Notification: React.FunctionComponent<NotificationProps> = ({
	image,
	firstName,
	lastName,
	message,
	time,
	viewed,
}): React.ReactNode => {
	const initials = getInitials(firstName, lastName);

	return (
		<div className='flex w-full flex-row items-center justify-start space-x-2 align-middle'>
			<Avatar>
				<AvatarImage src={image} alt='Avatar' />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className='flex w-full flex-col items-start justify-between space-y-1 align-middle'>
				<div className='flex w-full flex-row items-center justify-between space-x-4 align-middle'>
					<div className='flex w-full flex-row items-center justify-start space-x-4 align-middle'>
						<span className='text-base font-medium leading-none'>
							{firstName} {lastName}
						</span>
						<p className='truncate text-sm text-muted-foreground'>
							{message}
						</p>
					</div>
					{viewed && <Check className='h-4 w-4 text-primary' />}
				</div>
				<small className='text-xs text-muted-foreground'>{time}</small>
			</div>
		</div>
	);
};

export default Notification;
