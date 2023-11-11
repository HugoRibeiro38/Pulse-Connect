import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type SettingsItemProps = {
	href: string;
	icon: string;
	title: string;
};

const SettingsItem: React.FunctionComponent<SettingsItemProps> = ({
	href,
	icon,
	title,
}): React.ReactNode => {
	return (
		<Link
			href={href}
			className='p-2 flex w-full cursor-pointer flex-row items-center justify-between rounded-md align-middle hover:bg-accent hover:text-accent-foreground'>
			<div className='flex flex-row items-center justify-between space-x-2 align-middle'>
				<div className='p-2 rounded-md border border-input bg-background text-sm font-medium'>
					<Image
						src={icon}
						alt='Icon'
						width={16}
						height={16}
						className='h-5 w-5 dark:invert'
					/>
				</div>
				<span className='text-base font-normal'>{title}</span>
			</div>
			<ChevronRight className='h-5 w-5' />
		</Link>
	);
};

export default SettingsItem;
