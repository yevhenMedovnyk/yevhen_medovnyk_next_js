import Store from '@/components/Store/Store';
import { getProductsMinimal } from '@/lib/products';
import { IProduct } from '@/types/IProduct';
import { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const messages = await getMessages({ locale: locale });

	return {
		title: messages.Store.meta.title ?? 'Store | YM FineArt Prints',
		description: messages.Store.meta.description ?? 'Store | YM FineArt Prints',
	};
}

export default async function StorePage() {
	//const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/store/products/minimal`, {
	//	next: { revalidate: 0, tags: ['Store'] },
	//});

	//const productsMinimal: Pick<IProduct, '_id' | 'slug' | 'name'>[] = await res.json();

	const productsMinimal = await getProductsMinimal();
	const productsMinimalOpt = productsMinimal?.map(({ _id, slug, name }) => ({
		_id: _id.toString(),
		slug,
		name,
	}));

	return <Store productsMinimal={productsMinimalOpt ?? []} />;
}
