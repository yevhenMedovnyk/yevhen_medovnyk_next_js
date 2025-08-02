import React from 'react';
import AlbumGallery from '@/components/AlbumGallery/AlbumGallery.server';
import { getLocale, getMessages } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const messages = await getMessages({ locale: locale });

	return {
		title: messages.Gallery.meta.title ?? 'Gallery | YM FineArt Prints',
		description: messages.Gallery.meta.description ?? 'Gallery | YM FineArt Prints',
	};
}

const GalleryPage: React.FC = () => {
	return (
		<>
			<AlbumGallery category="gallery" />
		</>
	);
};

export default GalleryPage;
