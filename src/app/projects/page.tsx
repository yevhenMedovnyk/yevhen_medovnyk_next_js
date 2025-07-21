import React from 'react';
import AlbumGallery from '@/components/AlbumGallery/AlbumGallery.server';

const Projects: React.FC = () => {
	return (
		<>
			<AlbumGallery category="projects" />
		</>
	);
};

export default Projects;
