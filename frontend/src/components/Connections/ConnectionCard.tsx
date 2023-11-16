import { Unlink, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { APP_ROUTES } from '@/routes/app';
import { getInitials } from '@/utils/initials';

type ConnectionCardProps = {
	type: 'connection' | 'pending';
	id: string;
	image: string;
	firstName: string;
	lastName: string;
	username: string;
};

const ConnectionCard: React.FunctionComponent<ConnectionCardProps> = ({
	type,
	id,
	image,
	firstName,
	lastName,
	username,
}): React.ReactNode => {
	const initials = getInitials(firstName, lastName);
	return (
		<Link
			href={`${APP_ROUTES.PROFILE}/${id}`}
			className='transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105'>
			<Card>
				<CardHeader className='flex flex-col items-center justify-between gap-y-2'>
					<Avatar className='h-16 w-16'>
						<AvatarImage src={image} alt='Avatar' />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col items-center justify-between'>
						<CardTitle>
							{firstName} {lastName}
						</CardTitle>
						<CardDescription>{username}</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Button className='w-full'>
						{type === 'connection' ? (
							<Fragment>
								<Unlink className='mr-2 h-4 w-4' />
								Disconnect
							</Fragment>
						) : (
							<Fragment>
								<XCircle className='mr-2 h-4 w-4' />
								Cancel
							</Fragment>
						)}
					</Button>
				</CardContent>
			</Card>
		</Link>
	);
};

export default ConnectionCard;
