import { Metadata } from 'next';
import { IProduct } from '@/types/IProduct';
import { notFound } from 'next/navigation';
import s from './product.module.scss';
import { getLocale } from 'next-intl/server';
import ProductFull from '@/components/StoreItem/ProductFull';

// Завантаження товару на сервері
async function getProduct(slug: string): Promise<IProduct | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/store/${slug}`, {
			next: { revalidate: 0, tags: ['Store', 'Product'] },
		});
		if (!res.ok) return null;
		return res.json();
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ product: string }>;
}): Promise<Metadata> {
	const { product } = await params;
	const productData = await getProduct(product);
	if (!productData) return { title: 'Товар не знайдено' };

	const locale = await getLocale();

	return {
		title: productData.name[locale as keyof typeof productData.name] + ' | YM FineArt Prints',
		description:
			productData.captured_info[locale as keyof typeof productData.captured_info] ??
			'YM FineArt Prints',
	};
}

export default async function StoreItemPage({ params }: { params: Promise<{ product: string }> }) {
	const { product } = await params;
	const productData = await getProduct(product);
	if (!productData) return notFound();

	return (
		<div className={s.StoreItemPageContainer}>
			<ProductFull product={productData} />
		</div>
	);
}
