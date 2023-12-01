'use client';

import {
	CalendarDays,
	Link as LinkIcon,
	Mail,
	MapPin,
	Pencil,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
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
import { APP_ROUTES } from '@/routes/APP';
import { formatJoinDate } from '@/utils/format-join-date';
import { formatNumber } from '@/utils/format-number';
import { formatURL } from '@/utils/format-url';
import { getInitials } from '@/utils/get-initials';
import { truncateText } from '@/utils/truncate-text';

import EditProfileForm from '../Forms/EditProfileForm';
import AddConnectionButton from '../Testing/AddConnectionButton';
import MessageButton from '../Testing/MessageButton';
import MoreOptionsButton from '../Testing/MoreOptionsButton';
import RemoveConnectionButton from '../Testing/RemoveConnectionButton';
import ProfileSkeleton from './ProfileSkeleton';

type ProfileViewProps = {
	userId: string;
};

const ProfileView: React.FunctionComponent<ProfileViewProps> = ({
	userId,
}): React.ReactNode => {
	const { isLoading, isError, data, error } = useGetUserById(userId);
	const { data: session } = useSession();

	if (!session) return <div>Not authenticated</div>;

	if (isLoading) return <ProfileSkeleton />;

	if (isError) throw new Error(error.message);

	if (!data) return <div>Not found</div>;

	const isOwner = session.user.id === data.id;

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
			<div className='mt-16 flex w-full flex-col gap-4'>
				<div className='flex flex-row items-center justify-between flex-wrap gap-4'>
					<div className='flex flex-col'>
						<h2 className='text-xl font-bold'>
							{data.firstName} {data.lastName}
						</h2>
						<span className='text-sm text-muted-foreground'>
							@{data.username}
						</span>
					</div>
					<div className='flex flex-row justify-between gap-x-2'>
						{isOwner ? (
							<Fragment>
								<Dialog>
									<DialogTrigger asChild>
										<Button type='button'>
											<Pencil className='mr-2 h-4 w-4' />
											Edit Profile
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												Edit Profile
											</DialogTitle>
											<DialogDescription>
												Make changes to your profile
												here. Click save when
												you&apos;re done.
											</DialogDescription>
										</DialogHeader>
										<EditProfileForm id={data.id} />
									</DialogContent>
								</Dialog>
								<MoreOptionsButton />
							</Fragment>
						) : (
							<Fragment>
								<AddConnectionButton userId={userId} />
								<RemoveConnectionButton userId={userId} />
								<MessageButton userId={userId} />
							</Fragment>
						)}
					</div>
				</div>
				<p className='w-full text-base font-normal lg:w-3/4'>
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
								{data.email.toLowerCase()}
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
						<Link
							href={`${APP_ROUTES.PROFILE_CONNECTIONS(data.id)}`}
							className='underline-offset-4 hover:text-primary hover:underline'>
							<span className='text-sm font-bold'>
								{formatNumber(data.connectionsNumber)}
							</span>
						</Link>
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
