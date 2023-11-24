'use client';

import { CalendarDays, Link as LinkIcon, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useGetUserById } from '@/hooks/useUsers';
import { formatJoinDate } from '@/utils/format-join-date';
import { formatNumber } from '@/utils/format-number';
import { formatURL } from '@/utils/format-url';
import { getInitials } from '@/utils/get-initials';
import { truncateText } from '@/utils/truncate-text';

import ProfileSkeleton from './ProfileSkeleton';

type ProfileViewProps = {
	userId: string;
};

const ProfileView: React.FunctionComponent<ProfileViewProps> = ({
	userId,
}): React.ReactNode => {
	const { data, isLoading, error } = useGetUserById(userId);

	if (isLoading) return <ProfileSkeleton />;

	if (error) return <div>Error: {error.message}</div>;

	if (!data) return <div>Not found</div>;

	return (
		<Fragment>
			<div className='relative w-full'>
				<Dialog>
					<DialogTrigger asChild className='w-full'>
						<Image
							src={data.headerImageURL}
							alt='Header Image'
							width={1500}
							height={500}
							className='relative h-64 w-full cursor-pointer rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{data.firstName} {data.lastName}
							</DialogTitle>
							<DialogDescription>Header Image</DialogDescription>
						</DialogHeader>
						<Image
							src={data.headerImageURL}
							alt='Header Image'
							width={1500}
							height={500}
							className='h-auto w-full rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Dialog>
					<DialogTrigger asChild className='w-full'>
						<Avatar className='absolute bottom-0 left-8 h-32 w-32 translate-y-16 transform cursor-pointer shadow-md'>
							<AvatarImage
								src={data.profileImageURL}
								alt='Profile Image'
								className='object-cover object-center'
							/>
							<AvatarFallback>
								{getInitials(data.firstName, data.lastName)}
							</AvatarFallback>
						</Avatar>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{data.firstName} {data.lastName}
							</DialogTitle>
							<DialogDescription>Profile Image</DialogDescription>
						</DialogHeader>
						<Image
							src={data.profileImageURL}
							alt='Profile Image'
							width={256}
							height={256}
							className='h-auto w-full rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<div className='mt-16 flex w-full flex-col gap-y-4'>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-col'>
						<h2 className='text-xl font-bold'>
							{data.firstName} {data.lastName}
						</h2>
						<span className='text-sm text-muted-foreground'>
							@{data.username}
						</span>
					</div>
					<div className='flex flex-row justify-between gap-x-2'>
						{/* 
							If he's on the route "/profile/{id}" and the user is not friends with the authenticated user show -> <AddConnectionButton userId={userId} />
							If he's on the route "/profile/{id}" and the user is friends with the authenticated user show -> <RemoveConnectionButton userId={userId} />
							If he's on the route "/profile/{id}" and the user is friends with the authenticated user show -> <MessageButton userId={userId} />
							If he's on the route "/profile" show -> <EditProfileButton />
							If he's on the route "/profile" show -> <MoreOptionsButton />
						*/}
					</div>
				</div>
				<p className='w-3/4 text-base font-normal'>
					{truncateText(data.bio, 144)}
				</p>
				<div className='flex flex-col gap-y-1'>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<MapPin className='h-4 w-4 text-muted-foreground' />
							<span className='text-sm text-muted-foreground'>
								{data.city}, {data.country}
							</span>
						</div>
						<div className='flex flex-row items-center gap-x-2'>
							<CalendarDays className='h-4 w-4 text-muted-foreground' />
							<span className='text-sm text-muted-foreground'>
								Joined in {formatJoinDate(data.memberSince)}
							</span>
						</div>
					</div>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<Mail className='h-4 w-4 text-muted-foreground' />
							<a
								href={`mailto:${data.email}?subject=Contact by profile page at Pulse Connect.`}
								className='text-sm text-primary underline-offset-4 hover:underline'>
								{data.email}
							</a>
						</div>
						<div className='flex flex-row items-center gap-x-2'>
							<LinkIcon className='h-4 w-4 text-muted-foreground' />
							<a
								href={data.customURL}
								target='_blank'
								className='text-sm text-primary underline-offset-4 hover:underline'>
								{formatURL(data.customURL)}
							</a>
						</div>
					</div>
					<div className='flex flex-row items-center gap-x-2'>
						<span className='text-sm font-bold'>
							{formatNumber(data.connectionsNumber)}
						</span>
						<span className='text-sm text-muted-foreground'>
							Connections
						</span>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileView;
