'use client';

import { useCallback } from 'react';
import { fetchClient } from '@/utils/fetchClient';

export const useFetchClient = () => {
	return useCallback(
		(url: string, options: RequestInit = {}, withCookies: boolean = false) =>
			fetchClient(url, options, withCookies),
		[]
	);
};
