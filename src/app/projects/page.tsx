import React from 'react';
import AlbumGallery from '@/components/AlbumGallery/AlbumGallery.server';



export async function generateMetadata() {
	return {
		title: 'Проєкти | Yevhen Medovnyk',
	};
}

const Projects: React.FC = () => {
	return (
		<>
			<AlbumGallery category="projects" />
		</>
	);
};

export default Projects;
