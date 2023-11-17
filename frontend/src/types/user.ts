export type User = {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string;
};

export type MockUser = {
	createdAt: string;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	image: string;
	role: string;
	bio: string;
	country: string;
	id: number;
};
