import { Fragment } from 'react';

import AddConnectionButton from '@/components/Testing/AddConnectionButton';
import EditProfileButton from '@/components/Testing/EditProfileButton';
import MessageButton from '@/components/Testing/MessageButton';
import MoreOptionsButton from '@/components/Testing/MoreOptionsButton';
import RemoveConnectionButton from '@/components/Testing/RemoveConnectionButton';

type TestingProps = {
	//
};

const Testing: React.FunctionComponent<
	TestingProps
> = ({}): React.ReactNode => {
	return (
		<Fragment>
			<div className='container mx-auto flex h-screen flex-row items-center justify-center gap-4 px-4 sm:px-6 lg:px-8'>
				<AddConnectionButton userId={'1'} />
				<RemoveConnectionButton userId={'1'} />
				<EditProfileButton />
				<MoreOptionsButton />
				<MessageButton userId={'1'} />
			</div>
		</Fragment>
	);
};

export default Testing;
