import QueryProvider from '@/components/Providers/QueryProvider';
import { SessionProvider } from '@/components/Providers/SessionProvider';
import ThemeProvider from '@/components/Providers/ThemeProvider';

type ProvidersProps = {
	children: React.ReactNode;
};

const Providers: React.FunctionComponent<ProvidersProps> = ({
	children,
}): React.ReactNode => {
	return (
		<SessionProvider>
			<QueryProvider>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</QueryProvider>
		</SessionProvider>
	);
};

export default Providers;
