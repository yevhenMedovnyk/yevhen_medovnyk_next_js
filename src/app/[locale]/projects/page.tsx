import React from 'react';
import AlbumGallery from '@/components/AlbumGallery/AlbumGallery.server';
import { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const messages = await getMessages({ locale: locale });

	return {
		title: messages.Projects.meta.title ?? 'Projects | YM FineArt Prints',
		description: messages.Projects.meta.description ?? 'Projects | YM FineArt Prints',
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
