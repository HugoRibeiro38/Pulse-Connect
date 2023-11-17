import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { APP_ROUTES } from '@/routes/app';
import { getInitials } from '@/utils/initials';

import RemoveConnectionButton from './RemoveConnectionButton';

type ConnectionCardProps = {
	id: string;
	image: string;
	firstName: string;
	lastName: string;
	username: string;
};

const ConnectionCard: React.FunctionComponent<ConnectionCardProps> = ({
	id,
	image,
	firstName,
	lastName,
	username,
}): React.ReactNode => {
	const initials = getInitials(firstName, lastName);
	return (
		<div className='flex flex-col items-center justify-between gap-y-8 rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
			<div className='flex flex-col w-full'>
				<Link
					href={`${APP_ROUTES.PROFILE}/${id}`}
					className='flex w-full flex-col items-center justify-between gap-y-4'>
					<Avatar className='h-16 w-16'>
						<AvatarImage src={image} alt='Avatar' />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col items-center justify-between gap-y-1 text-center'>
						<div className='text-lg font-semibold leading-none tracking-tight'>
							{firstName} {lastName}
						</div>
						<div className='text-sm text-muted-foreground'>
							@{username}
						</div>
					</div>
				</Link>
			</div>
			<RemoveConnectionButton id={id} />
		</div>
	);
};

export default ConnectionCard;
