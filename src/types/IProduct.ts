import { IImage } from './IImage';

export interface IProductSize {
	id: string;
	label: string;
	price: number;
}

export interface IProduct {
	_id:  string;
	code_product: number;
	name: {
		ua: string;
		en: string;
	};
	slug: string;
	captured_info: {
		ua: string;
		en: string;
	};
	paper_info: {
		ua: string;
		en: string;
	};
	note: {
		ua: string;
		en: string;
	};
	sizes: IProductSize[];
	isLimited: boolean;
	imgs: IImage[];
	frame: {
		ua: string;
		en: string;
	};
	quantity?: number;
}
