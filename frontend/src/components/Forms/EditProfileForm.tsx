'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, Loader2, Save } from 'lucide-react';
import { Fragment } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
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
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { countries } from '@/data/countries';
import {
	type UserProfileInformation,
	UserProfileInformationSchema,
} from '@/validators/User';

type EditProfileFormProps = {
	//
};

const EditProfileForm: React.FunctionComponent<
	EditProfileFormProps
> = ({}): React.ReactNode => {
	const form = useForm<UserProfileInformation>({
		resolver: zodResolver(UserProfileInformationSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			bio: '',
			country: '',
			city: '',
			url: '',
		},
	});

	const onSubmit: SubmitHandler<UserProfileInformation> = (data) => {
		// TODO: Call API to update user profile info
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				toast({
					title: 'You submitted the following values:',
					description: (
						<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
							<code className='text-white'>
								{JSON.stringify(data, null, 2)}
							</code>
						</pre>
					),
				});
				resolve();
			}, 5000);
		});
	};

	return (
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
						<FormItem>
							<FormLabel>Country</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a country' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup className='max-h-64 overflow-y-auto'>
										<SelectLabel>Countries</SelectLabel>
										{countries.map(
											(country, index: number) => (
												<SelectItem
													key={`${country.value}-${index}`}
													value={country.value}
													className='cursor-pointer'>
													{country.label}
												</SelectItem>
											),
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='city'
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='Felgueiras'
									{...field}
								/>
							</FormControl>
							<FormMessage />
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
						<Button type='button' variant='secondary'>
							<Ban className='mr-2 h-4 w-4' />
							Cancel
						</Button>
					</DialogClose>
					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						className='max-w-min'>
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
				</DialogFooter>
			</form>
		</Form>
	);
};

export default EditProfileForm;
