'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/app';
import { writeOnLocalStorage } from '@/utils/local-storage';
import { type ISignUp, signUpSchema } from '@/validators/Auth';

const SignUpForm: React.FunctionComponent = (): React.ReactNode => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const refCaptcha = useRef<ReCAPTCHA>(null);

	const form = useForm<ISignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			remember: false,
		},
	});

	const onSubmit = (data: ISignUp) => {
		setIsSubmitting(true);

		if (data.remember)
			writeOnLocalStorage({
				key: 'remember',
				data: {
					email: data.email,
					password: data.password,
					remember: data.remember,
				},
			});

		console.log('Form data: ' + JSON.stringify(data));

		// const response = await signUp('credentials', {
		// 	email: data.email,
		// 	password: data.password,
		// 	callbackUrl: ROUTES.HOME,
		// });

		// console.log('Response: ' + JSON.stringify(response));
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'
				id='signup'
				name='signup'>
				<div className='flex flex-row justify-between space-x-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='w-full'>
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
							<FormItem className='w-full'>
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
				</div>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='PulseConnect'
									autoComplete='username'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='user@pulseconnect.com'
									autoComplete='email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-row items-center justify-between space-x-4 align-middle'>
					<FormField
						control={form.control}
						name='remember'
						render={({ field }) => (
							<FormItem className='flex flex-row space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										name='remember'
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel>Remember me</FormLabel>
							</FormItem>
						)}
					/>
					<Link
						href={APP_ROUTES.AUTH.FORGOT_PASSWORD}
						className={`${buttonVariants({
							variant: 'link',
						})}`}>
						Already have an account?
					</Link>
				</div>
				<ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
					ref={refCaptcha}
					size='invisible'
					hidden={true}
				/>
				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting || isSubmitting}>
					{isSubmitting ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
				<Separator />
				<Button type='button' variant='outline' className='w-full'>
					<Twitter className='mr-2 h-4 w-4' />
					Continue with Twitter
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
