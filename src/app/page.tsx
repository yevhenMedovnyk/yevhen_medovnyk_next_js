import React from 'react';
import AlbumGallery from '@/components/AlbumGallery/AlbumGallery.server';


export async function generateMetadata() {
	return {
		title: 'Галерея | Yevhen Medovnyk',
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
