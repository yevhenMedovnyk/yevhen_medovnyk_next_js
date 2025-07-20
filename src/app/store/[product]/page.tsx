import { Metadata } from 'next';
import StoreItem from '@/components/StoreItem/StoreItem';
import { IProduct } from '@/types/IProduct';
import { notFound } from 'next/navigation';
import s from './product.module.scss';

// Завантаження товару на сервері
async function getProduct(slug: string): Promise<IProduct | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/store/${slug}`, {
			next: { revalidate: 1800, tags: ['Store', 'Product'] },
		});
		if (!res.ok) return null;
		return res.json();
	} catch (e) {
		console.error(e);
		return null;
	}
}

interface Props {
	params: { product: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;

	const product = await getProduct(params.product);
	if (!product) return { title: 'Товар не знайдено' };

	return {
		title: product.name,
		description: product.captured_info,
	};
}

export default async function StoreItemPage(props: Props) {
	const params = await props.params;
	const product = await getProduct(params.product);
	if (!product) return notFound();

	return (
		<div className={s.StoreItemPageContainer}>
			<StoreItem full_page product={product} />
		</div>
	);
}
