import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

import styles from "./CartIcon.module.scss";

const CartIcon = () => {
	const pathname = usePathname();
	const isShowCartIcon = pathname.startsWith('/store') || pathname === '/cart';

	if (!isShowCartIcon) return null;

	return (
		<Link href="/cart" className={styles.cartIconContainer}>
			<PiShoppingCartSimpleFill className={styles.cartIcon} />
			{/*{itemsCount > 0 && <div className={s.countBadge}>{itemsCount}</div>}*/}
		</Link>
	);
};

export default CartIcon;
