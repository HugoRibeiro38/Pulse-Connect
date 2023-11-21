import { type Metadata, type NextPage } from 'next/types';
import { Separator } from '@/components/ui/separator';
import { ChangePasswordForm } from './change-password-form';

export const metadata: Metadata = {
    title: 'Pulse Connect - Profile',
};

const ChangePassowordePage: NextPage = (): React.ReactNode => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Change password</h3>
                <p className="text-sm text-muted-foreground">
                    Change your current password. This action might terminate all your current user sessions.
                </p>
            </div>
            <Separator />
            <ChangePasswordForm />
        </div>
    )
};

export default ChangePassowordePage;
