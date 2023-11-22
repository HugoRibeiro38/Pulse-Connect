'use client';

import { CalendarDays, Link as LinkIcon, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
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
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/app';

const ProfilePage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.HOME} />
					<Title title='Profile' />
				</div>
				<Separator />
			</div>
			<div className='relative w-full'>
				<Dialog>
					<DialogTrigger className='w-full'>
						<Image
							src='https://images.unsplash.com/photo-1682336606328-060825eb6bb4'
							alt='Banner Image'
							width={1500}
							height={500}
							className='relative h-64 w-full rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Tim Cook</DialogTitle>
							<DialogDescription>Header Image</DialogDescription>
						</DialogHeader>
						<Image
							src='https://images.unsplash.com/photo-1682336606328-060825eb6bb4'
							alt='Banner Image'
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
					<DialogTrigger>
						<Avatar className='absolute bottom-0 left-8 h-32 w-32 translate-y-16 transform shadow-md'>
							<AvatarImage
								src='https://www.apple.com/leadership/images/bio/tim-cook_image.png.og.png'
								alt='Profile Image'
								className='object-cover object-center'
							/>
							<AvatarFallback>WQ</AvatarFallback>
						</Avatar>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Tim Cook</DialogTitle>
							<DialogDescription>Profile Image</DialogDescription>
						</DialogHeader>
						<Image
							src='https://www.apple.com/leadership/images/bio/tim-cook_image.png.og.png'
							alt='Banner Image'
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
						<h2 className='text-xl font-bold'>Pulse Connect</h2>
						<span className='text-sm text-muted-foreground'>
							@pulseconnect
						</span>
					</div>
					<div className='flex flex-row justify-between gap-x-2'>
						<Button>Connect</Button>
					</div>
				</div>
				<p className='w-3/4 text-base font-normal'>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Soluta culpa dolor quae voluptatum numquam laudantium.
				</p>
				<div className='flex flex-col gap-y-1'>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<MapPin className='h-4 w-4 text-muted-foreground' />
							<span className='text-sm text-muted-foreground'>
								Felgueiras, Portugal
							</span>
						</div>
						<div className='flex flex-row items-center gap-x-2'>
							<CalendarDays className='h-4 w-4 text-muted-foreground' />
							<span className='text-sm text-muted-foreground'>
								Joined in September 2023
							</span>
						</div>
					</div>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<Mail className='h-4 w-4 text-muted-foreground' />
							<a
								href='#'
								className='text-sm text-primary underline-offset-4 hover:underline'>
								admin@pulseconnect.com
							</a>
						</div>
						<div className='flex flex-row items-center gap-x-2'>
							<LinkIcon className='h-4 w-4 text-muted-foreground' />
							<a
								href='#'
								className='text-sm text-primary underline-offset-4 hover:underline'>
								twitter.com/pulseconnect
							</a>
						</div>
					</div>
					<div className='flex flex-row items-center gap-x-2'>
						<span className='text-sm font-bold'>6</span>
						<span className='text-sm text-muted-foreground'>
							Connections
						</span>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfilePage;
