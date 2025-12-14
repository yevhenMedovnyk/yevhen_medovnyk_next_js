import * as yup from 'yup';

export const createAlbumSchema = yup.object({
	name: yup.object({
		ua: yup.string().required('Назва українською обов’язкова'),
		en: yup.string().required('Назва англійською обов’язкова'),
	}),
	category: yup.string().required('Оберіть категорію'),
	cover_img: yup.mixed().required('Оберіть обкладку'),
	album_images: yup.array().of(yup.mixed()).nullable(),
});
