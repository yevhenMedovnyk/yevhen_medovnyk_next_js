import { IAlbum } from '@/types/IAlbum';
import AlbumGalleryClient from './AlbumGallery.client';

interface Props {
	category: string;
}

async function getAlbums(category: string): Promise<IAlbum[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/albums?category=${category}`, {
		next: { revalidate: 3600, tags: ['Albums'] },
	});
	return res.json();
}

const AlbumGallery = async ({ category }: Props) => {
	const albums = await getAlbums(category);

	return <AlbumGalleryClient albums={albums} />;
};

export default AlbumGallery;
