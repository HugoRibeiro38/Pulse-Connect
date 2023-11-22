export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	image: string;
	banner: string;
	bio: string;
	city: string;
	country: string;
	url: string;
	numConnections: number;
	createdAt: string;
};

export type Users = Users[];
