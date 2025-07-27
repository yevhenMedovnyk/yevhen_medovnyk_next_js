'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const useLocaleSwitcher = () => {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const switchLocale = (newLocale: string) => {
		const segments = pathname.split('/');
		segments[1] = newLocale; // припускаємо, що локаль — 1-й сегмент шляху
		const newPath = segments.join('/') || '/';

		router.push(newPath);
	};

	return {
		locale,
		switchLocale,
	};
};

export default useLocaleSwitcher;
