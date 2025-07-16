import { IImage } from './IImage';

export interface IProduct {
	_id: number;
	code_product: number;
	name: string;
	captured_info: string;
	paper_info: string;
	note: string;
	price: number;
	size_with_borders: string;
	size_without_borders: string;
	isLimited: boolean;
	imgs: IImage[];
	isFramed: boolean;
	quantity?: number;
}
