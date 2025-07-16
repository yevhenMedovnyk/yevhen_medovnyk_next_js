export interface IImage {
	_id?: string;
	name: string;
	img: string;
	width?: number;
	height?: number;
	album_id?: string;
	description?: {
		ua: string;
		en: string;
	};
}
