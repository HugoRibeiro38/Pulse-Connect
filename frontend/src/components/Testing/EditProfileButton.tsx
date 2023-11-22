import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import EditProfileForm from '../Forms/EditProfileForm';

const EditProfileButton: React.FunctionComponent = (): React.ReactNode => {
	return (
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
						Make changes to your profile here. Click save when
						you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<EditProfileForm />
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileButton;
