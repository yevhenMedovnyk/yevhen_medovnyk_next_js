import { Metadata } from 'next';
import { IProduct } from '@/types/IProduct';
import { notFound } from 'next/navigation';
import s from './product.module.scss';
import { getLocale } from 'next-intl/server';
import ProductFull from '@/components/StoreItem/ProductFull';
import { getProduct } from '@/lib/products';

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

	const productDataOpt: IProduct = { ...productData, _id: productData?._id.toString() };

	return (
		<div className={s.StoreItemPageContainer}>
			<ProductFull product={productDataOpt} />
		</div>
	);
}
