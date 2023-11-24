import { type LucideIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/get-initials';

type TeamMemberItemProps = {
	email: string;
	imageURL: string;
	firstName: string;
	lastName: string;
	role: string;
	socials: { icon: LucideIcon; url: string }[];
};

const TeamMemberItem: React.FunctionComponent<TeamMemberItemProps> = ({
	email,
	imageURL,
	firstName,
	lastName,
	role,
	socials,
}): React.ReactNode => {
	const initials = getInitials(firstName, lastName);
	return (
		<div className='flex flex-col items-center justify-center gap-y-4'>
			<a
				href={`mailto:${email}?subject=Contact via about page.`}
				className='flex flex-col items-center justify-center gap-y-4'>
				<Avatar className='h-32 w-32'>
					<AvatarImage
						src={imageURL}
						alt={`${firstName} ${lastName} Avatar`}
						className='bg-foreground object-cover object-top'
					/>
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className='flex flex-col items-center justify-between text-center'>
					<h4 className='text-2xl font-semibold'>
						{firstName} {lastName}
					</h4>
					<p className='text-base font-normal text-muted-foreground'>
						{role}
					</p>
				</div>
			</a>
			<div className='flex flex-row items-center justify-between gap-x-4'>
				{socials.map(({ icon: Icon, url }, index) => (
					<a
						key={`${url}-${index}`}
						href={url}
						target='_blank'
						rel='noopener noreferrer'
						className='hover:text-primary'>
						<Icon className='h-4 w-4' />
					</a>
				))}
			</div>
		</div>
	);
};

export default TeamMemberItem;
