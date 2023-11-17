export enum APIStatus {
	SUCCESS = 'success',
	ERROR = 'error',
}

export enum HTTPStatusCode {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
}

type APIError = {
	code: HTTPStatusCode;
	type: string;
	title: string;
	message: string;
};

export type APIResponse<T> = {
	status: APIStatus;
	statusCode: HTTPStatusCode;
	data?: Partial<T>;
	error?: APIError;
};
