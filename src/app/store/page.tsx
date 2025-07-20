import Store from '@/components/Store/Store';
import { IProduct } from '@/types/IProduct';

export default async function StorePage() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/store/products/minimal`, {
		next: { revalidate: 0, tags: ['Store'] },
	});

	const productsMinimal: Pick<IProduct, '_id' | 'slug' | 'name' | 'imgs'>[] = await res.json();

	return <Store productsMinimal={productsMinimal} />;
}
