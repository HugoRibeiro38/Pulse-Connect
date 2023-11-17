export type SignInProps = {
	email: string;
	password: string;
};

export type SignUpProps = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
};

export type LocalStorageProps = {
	email: string;
	password: string;
	remember: boolean;
};

export type CookieType = {
	email: string;
	password: string;
	remember: boolean;
};
