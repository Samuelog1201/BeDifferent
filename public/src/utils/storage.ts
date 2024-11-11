const get = (key: string, defaultValue: any = null) => {
	try {
		const value = localStorage.getItem(key) || sessionStorage.getItem(key);
		return value ? JSON.parse(value) : defaultValue;
	} catch (error) {
		console.error('Error getting value from storage:', error);
		return defaultValue;
	}
};

const set = (key: string, value: any, session: boolean = false) => {
	try {
		const storage = session ? sessionStorage : localStorage;
		const parsed = JSON.stringify(value);
		storage.setItem(key, parsed);
	} catch (error) {
		console.error('Error setting value to storage:', error);
	}
};

const remove = (key: string, session: boolean = false) => {
	const storage = session ? sessionStorage : localStorage;
	storage.removeItem(key);
};

const clear = (session: boolean = false) => {
	const storage = session ? sessionStorage : localStorage;
	storage.clear();
};

export default {
	get,
	set,
	remove,
	clear,
};

