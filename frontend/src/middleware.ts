export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/',
		'/app',
		'/connections',
		'/connections/:path*',
		'/messages',
		'/messages/:path*',
		'/notifications',
		'/profile',
		'/profile/:path*',
		'/search',
		'/settings',
		'/settings/:path*',
	],
};
