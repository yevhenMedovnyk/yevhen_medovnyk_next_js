import { IProduct } from './IProduct';

export interface ICartItem extends IProduct {
	quantity_in_cart: number;
}
