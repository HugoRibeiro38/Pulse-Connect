'use client';

import {
	Ban,
	Check,
	ChevronsUpDown,
	Loader2,
	Pencil,
	Save,
} from 'lucide-react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { countries } from '@/data/countries';
import { cn } from '@/lib/utils';

type TestingProps = {
	//
};

const Testing: React.FunctionComponent<
	TestingProps
> = ({}): React.ReactNode => {
	const form = useForm({
		resolver: undefined,
		defaultValues: undefined,
	});

	const onSubmit = ({}) => {
		console.log();
	};

	return (
		<Fragment>
			<div className='container mx-auto flex h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
				<Dialog>
					<DialogTrigger asChild>
						<Button type='button'>
							<Pencil className='mr-2 h-4 w-4' />
							Edit Profile
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save
								when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								name='edit-profile'
								className='grid gap-4'>
								<FormField
									control={form.control}
									name='firstName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input
													type='text'
													placeholder='Pulse'
													autoComplete='given-name'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='lastName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input
													type='text'
													placeholder='Connect'
													autoComplete='family-name'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='bio'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Bio</FormLabel>
											<FormControl>
												<Textarea
													className='resize-none'
													placeholder='Tell us a little bit about yourself'
													maxLength={144}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='country'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Country</FormLabel>
											<Popover modal={true}>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant='outline'
															role='combobox'
															className={cn(
																'justify-between',
																!field.value &&
																	'text-muted-foreground',
															)}>
															{field.value
																? countries.find(
																		(
																			country,
																		) =>
																			country.value ===
																			field.value,
																  )?.label
																: 'Select country'}
															<ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className='p-0'>
													<Command>
														<CommandInput placeholder='Search country...' />
														<CommandEmpty>
															No country found.
														</CommandEmpty>
														<ScrollArea className='h-64 overflow-auto'>
															<CommandGroup>
																{countries.map(
																	(
																		country,
																	) => (
																		<CommandItem
																			value={
																				country.label
																			}
																			key={
																				country.value
																			}
																			onSelect={() => {
																				form.setValue(
																					'country',
																					country.value,
																				);
																			}}>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					country.value ===
																						field.value
																						? 'opacity-100'
																						: 'opacity-0',
																				)}
																			/>
																			{
																				country.label
																			}
																		</CommandItem>
																	),
																)}
															</CommandGroup>
														</ScrollArea>
													</Command>
												</PopoverContent>
											</Popover>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='url'
									render={({ field }) => (
										<FormItem>
											<FormLabel>URL</FormLabel>
											<FormControl>
												<Input
													type='text'
													placeholder='https://www.pulseconnect.com'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											type='button'
											variant='secondary'>
											<Ban className='mr-2 h-4 w-4' />
											Cancel
										</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button
											type='submit'
											disabled={
												form.formState.isSubmitting
											}>
											{form.formState.isSubmitting ? (
												<Fragment>
													<Loader2 className='mr-2 h-4 w-4 animate-spin' />
													Updating...
												</Fragment>
											) : (
												<Fragment>
													<Save className='mr-2 h-4 w-4' />
													Save
												</Fragment>
											)}
										</Button>
									</DialogClose>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</Fragment>
	);
};

export default Testing;
