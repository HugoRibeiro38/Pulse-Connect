import {
	ChevronDown,
	Contrast,
	HelpCircle,
	Languages,
	LogOut,
	Settings,
	User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { SearchBar } from '@/components/shared/SearchBar';
import { ThemeButton } from '@/components/ThemeButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { APP_ROUTES } from '@/routes/app';

const Navbar: React.FunctionComponent = (): React.ReactNode => {
	return (
		<header className='flex w-full flex-row items-center justify-between border-b border-input p-8'>
			<Link href='/'>
				<Image
					src='/logo/Logo Transparent Text Black.svg'
					alt='Logo'
					width={32}
					height={32}
					className='dark:nightMode h-8 w-auto'
				/>
			</Link>
			<SearchBar size='lg' />
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className='flex cursor-pointer flex-row items-center justify-between space-x-2 whitespace-nowrap rounded-md p-2  align-middle ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
					<div>
						<Avatar>
							<AvatarImage
								src={'/logo/Logo Transparent.svg'}
								alt='Avatar'
							/>
							<AvatarFallback>PC</AvatarFallback>
						</Avatar>
						<div className='flex flex-col items-start justify-between align-middle'>
							<span className='text-base font-medium'>
								Pulse Connect
							</span>
							<div className='flex flex-row items-center justify-between space-x-1 align-middle'>
								<div className='h-3 w-3 rounded-full bg-emerald-500' />{' '}
								<span className='text-xs font-normal text-muted-foreground'>
									Online
								</span>
							</div>
						</div>
						<ChevronDown className='h-5 w-5' />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link
								href={APP_ROUTES.PROFILE}
								className='flex flex-row justify-center align-middle'>
								<User className='mr-2 h-4 w-4' />
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href={APP_ROUTES.SETTINGS.ROOT}
								className='flex flex-row justify-center align-middle'>
								<Settings className='mr-2 h-4 w-4' />
								Settings
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className='cursor-pointer'>
								<Contrast className='mr-2 h-4 w-4' />
								Appearance
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem className='cursor-pointer'>
										<ThemeButton
											themeType='light'
											title='Light'
											icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1biI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjB2MiIvPjxwYXRoIGQ9Im00LjkzIDQuOTMgMS40MSAxLjQxIi8+PHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xOS4wNyA0LjkzLTEuNDEgMS40MSIvPjwvc3ZnPg=='
										/>
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer'>
										<ThemeButton
											themeType='dark'
											title='Dark'
											icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vb24iPjxwYXRoIGQ9Ik0xMiAzYTYgNiAwIDAgMCA5IDkgOSA5IDAgMSAxLTktOVoiLz48L3N2Zz4='
										/>
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer'>
										<ThemeButton
											themeType='system'
											title='System'
											icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1bi1tb29uIj48cGF0aCBkPSJNMTIgOGEyLjgzIDIuODMgMCAwIDAgNCA0IDQgNCAwIDEgMS00LTQiLz48cGF0aCBkPSJNMTIgMnYyIi8+PHBhdGggZD0iTTEyIDIwdjIiLz48cGF0aCBkPSJtNC45IDQuOSAxLjQgMS40Ii8+PHBhdGggZD0ibTE3LjcgMTcuNyAxLjQgMS40Ii8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PHBhdGggZD0ibTYuMyAxNy43LTEuNCAxLjQiLz48cGF0aCBkPSJtMTkuMSA0LjktMS40IDEuNCIvPjwvc3ZnPg=='
										/>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className='cursor-pointer'>
								<Languages className='mr-2 h-4 w-4' />
								Language
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem className='cursor-pointer'>
										Portuguese
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer'>
										English
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer'>
						<HelpCircle className='mr-2 h-4 w-4' />
						Help
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer'>
						<Link
							href={APP_ROUTES.AUTH.SIGNOUT}
							className='flex w-full flex-row items-center justify-start align-middle'>
							<LogOut className='mr-2 h-4 w-4' />
							Sign Out
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Navbar;
