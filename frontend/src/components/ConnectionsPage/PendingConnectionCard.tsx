'use client';

import { Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useDeletePendingConnection } from '@/hooks/useConnections';
import { APP_ROUTES } from '@/routes/APP';
import { getInitials } from '@/utils/get-initials';

type PendingConnectionCardProps = {
	userId: string;
	imageURL: string;
	firstName: string;
	lastName: string;
	username: string;
};

const PendingConnectionCard: React.FunctionComponent<
	PendingConnectionCardProps
> = ({ userId, imageURL, firstName, lastName, username }): React.ReactNode => {
	const { mutate, isPending } = useDeletePendingConnection();
	return (
		<div className='flex flex-col items-center justify-between gap-y-8 rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
			<div className='flex w-full flex-col'>
				<Link
					href={`${APP_ROUTES.PROFILE}/${userId}`}
					className='flex w-full flex-col items-center justify-between gap-y-4'>
					<Avatar className='h-16 w-16'>
						<AvatarImage src={imageURL} alt='Avatar' />
						<AvatarFallback>
							{getInitials(firstName, lastName)}
						</AvatarFallback>
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
			<Button disabled={isPending} onClick={() => mutate(userId)}>
				{isPending ? (
					<Fragment>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Canceling...
					</Fragment>
				) : (
					<Fragment>
						<XCircle className='mr-2 h-4 w-4' />
						Cancel
					</Fragment>
				)}
			</Button>
		</div>
	);
};

export default PendingConnectionCard;
