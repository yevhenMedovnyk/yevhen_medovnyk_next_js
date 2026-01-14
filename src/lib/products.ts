import StoreItem from '@/models/StoreItem';
import dbConnect from './dbConnect';
import { unstable_cache } from 'next/cache';

export const getProductsMinimal = unstable_cache(
	async () => {
		try {
			await dbConnect();
			const products = await StoreItem.find({}).select('name slug price');
			return products;
		} catch (error: any) {
			console.error(error);
			return null;
		}
	},
	['products-minimal'],
	{ revalidate: 3600, tags: ['Store'] }
);
