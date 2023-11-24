export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	profileImageURL: string;
	headerImageURL: string;
	bio: string;
	city: string;
	country: string;
	customURL: string;
	connectionsNumber: number;
	memberSince: string;
};

export type Users = Users[];
