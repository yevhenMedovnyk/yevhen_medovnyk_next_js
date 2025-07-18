export const fetchClient = async (
	url: string,
	options: RequestInit = {},
	withCookies: boolean = false
) => {
	const config: RequestInit = {
		...options,
		credentials: withCookies ? 'include' : 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
	};

	const res = await fetch(url, config);
	if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
	return res.json();
};
