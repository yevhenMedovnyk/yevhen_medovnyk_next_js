import { useEffect, useState } from 'react';

const useSafeMediaQuery = (query: string): boolean | null => {
	const [matches, setMatches] = useState<null | boolean>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQueryList = window.matchMedia(query);

		const handleChange = () => {
			setMatches(mediaQueryList.matches);
		};

		handleChange(); // початкове значення

		mediaQueryList.addEventListener('change', handleChange);

		return () => {
			mediaQueryList.removeEventListener('change', handleChange);
		};
	}, [query]);

	return matches;
};

export const useMediaQuery = () => {
	const isMobile = useSafeMediaQuery('(max-width: 576px)');
	const isSmallTablet = useSafeMediaQuery('(max-width: 768px)');
	const isTablet = useSafeMediaQuery('(max-width: 999px)');
	const isDesktop = useSafeMediaQuery('(max-width: 1280px)');

	return {
		isMobile,
		isSmallTablet,
		isTablet,
		isDesktop,
	};
};

export default useMediaQuery;
