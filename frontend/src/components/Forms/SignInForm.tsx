'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { type SubmitHandler, useForm } from 'react-hook-form';

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
import { toast } from '@/components/ui/use-toast';
import { APP_ROUTES } from '@/routes/APP';
import { decrypt } from '@/utils/cryptography';
import { readFromLocalStorage } from '@/utils/local-storage';
import { type SignIn, SignInSchema } from '@/validators/Auth';

const SignInForm: React.FunctionComponent = (): React.ReactNode => {
	const refCaptcha = useRef<ReCAPTCHA>(null);
	const searchParams = useSearchParams();

	const callbackUrl = searchParams.get('callbackUrl') ?? APP_ROUTES.HOME;

	const form = useForm<SignIn>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			const storedData: {
				email: string;
				password: string;
				remember: boolean;
			} | null = readFromLocalStorage({ key: 'remember' });
			if (!storedData) return;
			const password = await decrypt(storedData.password);
			if (!password) return;
			form.setValue('email', storedData.email);
			form.setValue('password', password);
			form.setValue('remember', storedData.remember);
		};
		void fetchData();
	}, [form]);

	const onSubmit: SubmitHandler<SignIn> = (data) => {
		// TODO: Call API to update user profile info
		// if (!remember) removeFromLocalStorage({ key: 'remember' });
		// else {
		// 	const encryptedPassword = await encrypt(password);
		// 	if (!encryptedPassword) return;
		// 	writeOnLocalStorage({
		// 		key: 'remember',
		// 		data: {
		// 			email,
		// 			password: encryptedPassword,
		// 			remember,
		// 		},
		// 	});
		// }

		// const response = await signIn('credentials', {
		// 	email,
		// 	password,
		// 	redirect: true,
		// 	callbackUrl: callbackUrl,
		// });

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
				name='sign-in-form'
				className='flex w-full flex-col gap-4'>
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
									autoComplete='current-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-row flex-wrap items-center justify-between align-middle'>
					<FormField
						control={form.control}
						name='remember'
						render={({ field }) => (
							<FormItem className='flex flex-row space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
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
						Forgot your password?
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
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<Fragment>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Submitting...
						</Fragment>
					) : (
						<Fragment>Submit</Fragment>
					)}
				</Button>
				<Separator />
				<Link
					href={APP_ROUTES.AUTH.SIGN_UP}
					className={`w-full ${buttonVariants({
						variant: 'secondary',
					})}`}>
					Create an account
				</Link>
				<Button type='button' variant='outline' className='w-full'>
					<Twitter className='mr-2 h-4 w-4' />
					Continue with Twitter
				</Button>
			</form>
		</Form>
	);
};

export default SignInForm;
