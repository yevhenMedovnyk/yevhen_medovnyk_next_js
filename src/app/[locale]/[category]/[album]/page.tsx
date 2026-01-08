import React from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { notFound } from 'next/navigation';
//import { Metadata } from 'next';
import { IAlbum } from '@/types/IAlbum';
import { getLocale } from 'next-intl/server';
import { getAlbumBySlug } from '@/lib/albums';
import { getImagesMinimal } from '@/lib/images';

interface PageProps {
	params: {
		category: string;
		album: string;
	};
}

interface MetadataProps {
	params: Promise<{
		category: string;
		album: string;
	}>;
}

export async function generateMetadata({ params }: MetadataProps) {
	const { category, album } = await params;

	const albumData = await getAlbumBySlug(album);

	if (!albumData) notFound();
	if (albumData.category !== category) notFound();

	const locale = await getLocale();
	const nameLocale = locale as keyof IAlbum['name'];
	const descLocale = locale as keyof IAlbum['description'];

	return {
		title: albumData.name[nameLocale] + ' | Yevhen Medovnyk',
		description: albumData.description
			? albumData.description[descLocale]
			: `${albumData.name[nameLocale]} | Photographer Yevhen Medovnyk'`,
	};
}

//export async function generateStaticParams(): Promise<{ category: string; album: string }[]> {
//	try {
//		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/albums`, {
//			next: { revalidate: 3600, tags: ['Albums'] },
//		});

//		const albums = (await res.json()) as IAlbum[];

//		return albums.map((album) => ({
//			category: album.category,
//			album: album.slug,
//		}));
//	} catch (e) {
//		console.error('Failed to generate static params:', e);
//		return [];
//	}
//}

export default async function AlbumPage({ params }: PageProps) {
	const { album } = await params;

	const imagesIdObject = await getImagesMinimal(album);

	const imageIds = imagesIdObject?.map(({ _id, width, height }) => ({
		_id: _id.toString(),
		width: width,
		height: height,
	}));

	return (
		<div className={s.album}>
			<Gallery imageIds={imageIds} />
		</div>
	);
}
