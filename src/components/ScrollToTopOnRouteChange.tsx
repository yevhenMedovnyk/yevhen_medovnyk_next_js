'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTopOnRouteChange() {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	return null;
}
