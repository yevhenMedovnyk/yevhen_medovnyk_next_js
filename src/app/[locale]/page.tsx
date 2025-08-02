import React from 'react';
import AlbumGallery from '@/components/AlbumGallery/AlbumGallery.server';
import { getLocale, getMessages } from 'next-intl/server';

export async function generateMetadata() {
	const locale = await getLocale();
	const messages = await getMessages({ locale: locale });

	return {
		title: messages.Gallery.meta.title,
		description: messages.Gallery.meta.description,
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
