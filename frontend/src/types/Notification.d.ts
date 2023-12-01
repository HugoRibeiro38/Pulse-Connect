export type Notification = {
	id: string;
	userId: string;
	profileImageURL: string;
	firstName: string;
	lastName: string;
	message: string;
	createdAt: string;
	isRead: boolean;
};

export type NotificationTotal = {
	total: number;
};

export type Notifications = Notification[];
