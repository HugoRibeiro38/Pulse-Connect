import { type Metadata, type NextPage } from 'next/types';
import { Separator } from '@/components/ui/separator';
import { EditProfileForm } from './edit-profile-form';

export const metadata: Metadata = {
    title: 'Pulse Connect - Profile',
};

const EditProfilePage: NextPage = (): React.ReactNode => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Edit profile</h3>
                <p className="text-sm text-muted-foreground">
                    Edit your current user profile information. This information will be displayed publicly so be careful.
                </p>
            </div>
            <Separator />
            <EditProfileForm />
        </div>
    )
};

export default EditProfilePage;
