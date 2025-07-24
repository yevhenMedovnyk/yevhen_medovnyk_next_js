import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';

import s from './CartIcon.module.scss';
import { useCartItemCount } from '@/stores/hooks/cartSelectors';

const CartIcon = () => {
	const pathname = usePathname();
	const isShowCartIcon = pathname.startsWith('/store') || pathname === '/cart';
	const itemsCount = useCartItemCount();

	if (!isShowCartIcon) return null;

	return (
		<Link href="/cart" className={s.cartIconContainer}>
			<PiShoppingCartSimpleFill className={s.cartIcon} />
			{itemsCount > 0 && <div className={s.countBadge}>{itemsCount}</div>}
		</Link>
	);
};

export default CartIcon;
