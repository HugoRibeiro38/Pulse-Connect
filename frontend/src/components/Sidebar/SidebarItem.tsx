'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
	href: string;
	title: string;
	icon: string;
};

const SidebarItem: React.FunctionComponent<SidebarItemProps> = ({
	href,
	title,
	icon,
}): React.ReactNode => {
	const pathname = usePathname();
	return (
		<Link
			href={href}
			className='flex flex-col items-center justify-between gap-y-2 decoration-solid decoration-2 underline-offset-4 hover:underline'>
			<Image
				src={icon}
				alt='Icon'
				width={20}
				height={20}
				className='h-5 w-5 dark:invert'
			/>
			<span
				className={clsx('text-xs font-normal', {
					'underline decoration-primary decoration-solid decoration-2 underline-offset-4':
						pathname === href,
					'no-underline': pathname !== href,
				})}>
				{title}
			</span>
		</Link>
	);
};

export default SidebarItem;
