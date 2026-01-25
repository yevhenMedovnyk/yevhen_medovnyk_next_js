import StoreItem from '@/models/StoreItem';
import dbConnect from './dbConnect';
import { unstable_cache } from 'next/cache';
import { IProduct } from '@/types/IProduct';

export const getProductsMinimal = unstable_cache(
	async () => {
		try {
			await dbConnect();
			const products = await StoreItem.find({})
				.select('name slug price')
				.lean<Pick<IProduct, '_id' | 'slug' | 'name'>[]>();
			return products;
		} catch (error: any) {
			console.error(error);
			return null;
		}
	},
	['products-minimal'],
	{ revalidate: 3600, tags: ['Store'] }
);

export const getProduct = (slug: string) =>
	unstable_cache(
		async () => {
			try {
				await dbConnect();
				const product = await StoreItem.findOne({ slug }).lean<IProduct>();
				return product;
			} catch (error: any) {
				console.error(error);
				return null;
			}
		},
		['product', slug],
		{ revalidate: 3600, tags: ['Store', 'Product'] }
	)();
