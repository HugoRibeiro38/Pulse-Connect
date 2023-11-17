export const useLocalStorage = <T>(key: string) => {
	const isLocalStorageSupported = (): boolean =>
		typeof localStorage !== 'undefined';

	const setItem = (data: T): void => {
		if (!isLocalStorageSupported()) return;
		try {
			window.localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const getItem = (): T | undefined => {
		if (!isLocalStorageSupported()) return;
		try {
			const data = window.localStorage.getItem(key);
			return data ? (JSON.parse(data) as T) : undefined;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const removeItem = (): void => {
		if (!isLocalStorageSupported()) return;
		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return { setItem, getItem, removeItem };
};
