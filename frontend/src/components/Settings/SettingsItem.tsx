import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SettingsItemProps = {
	href: string;
	label: string;
	subLabel: string;
	icon: LucideIcon;
};

const SettingsItem: React.FunctionComponent<SettingsItemProps> = ({
	href,
	label,
	subLabel,
	icon: Icon,
}): React.ReactNode => {
	return (
		<Link
			href={href}
			className='flex w-full cursor-pointer flex-row items-center justify-between rounded-md p-2 hover:bg-accent hover:text-accent-foreground'>
			<div className='flex flex-row items-center justify-between gap-x-2'>
				<div className='rounded-md border border-input bg-background p-2'>
					<Icon className='h-5 w-5'/>
				</div>
				<div className='flex flex-col items-start justify-between text-base font-normal'>
					{label}
					<small className='text-xs leading-none text-muted-foreground'>
						{subLabel}
					</small>
				</div>
			</div>
			<ChevronRight className='h-5 w-5' />
		</Link>
	);
};

export default SettingsItem;
