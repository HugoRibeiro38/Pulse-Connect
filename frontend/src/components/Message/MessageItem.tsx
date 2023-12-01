import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { APP_ROUTES } from '@/routes/APP';
import { formatTimestamp } from '@/utils/format-timestamp';
import { getInitials } from '@/utils/get-initials';
import { typeOfMessage } from '@/utils/message-type';

type MessageItemProps = {
	id: string;
	image: string;
	firstName: string;
	lastName: string;
	time: string;
	message: string;
};

const MessageItem: React.FunctionComponent<MessageItemProps> = ({
	id,
	image,
	firstName,
	lastName,
	time,
	message,
}): React.ReactNode => {
	const initials = getInitials(firstName, lastName);

	return (
		<Link
			href={`${APP_ROUTES.MESSAGES}/${id}`}
			className='w-full rounded-md p-1.5 transition-colors hover:bg-accent hover:text-accent-foreground'>
			<div className='flex flex-row items-center justify-start space-x-2'>
				<Avatar className='h-12 w-12'>
					<AvatarImage src={image} alt='Avatar' />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className='flex w-full flex-col items-start justify-between space-y-1'>
					<div className='flex w-full flex-row items-center justify-between'>
						<span className='text-base font-medium leading-none'>
							{firstName} {lastName}
						</span>
						<small className='text-xs text-muted-foreground'>
							{formatTimestamp(time)}
						</small>
					</div>
					<p className='text-xs text-muted-foreground'>
						{typeOfMessage(message)}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default MessageItem;
