export interface IAlbum {
	_id?: string;
	cover_img: string;
	name: {
		ua: string;
		en: string;
	};
	category: string;
	slug: string;
	description?: {
		ua?: string;
		en?: string;
	};
}
