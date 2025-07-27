
export const locales = ['en', 'ua'] as const;
export const defaultLocale = 'ua';

export type Locale = (typeof locales)[number];
