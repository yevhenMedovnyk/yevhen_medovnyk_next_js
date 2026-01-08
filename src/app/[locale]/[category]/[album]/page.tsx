import React from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { IAlbum } from '@/types/IAlbum';
import { getLocale } from 'next-intl/server';
import { getAlbumBySlug } from '@/lib/albums';
import { getImagesMinimal } from '@/lib/images';

interface ImageMinimal {
	_id: string;
	width: number;
	height: number;
}

interface Props {
	params: Promise<{
		category: string;
		album: string;
	}>;
}

//async function getAlbum(slug: string): Promise<IAlbum | null> {
//	try {
//		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/albums/${slug}`, {
//			next: { revalidate: 3600, tags: ['Albums'] },
//		});
//		if (!res.ok) return null;
//		return res.json();
//	} catch (e) {
//		console.error(e);
//		return null;
//	}
//}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

//async function getImagesMinimal(slug: string): Promise<ImageMinimal[] | null> {
//	try {
//		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/images/minimal/${slug}`, {
//			next: { revalidate: 3600, tags: ['Images'] },
//		});
//		if (!res.ok) return null;
//		return res.json();
//	} catch (e) {
//		console.error(e);
//		return null;
//	}
//}

export default async function AlbumPage({ params }: Props) {
	const { album } = await params;

	const imagesIdObject = await getImagesMinimal(album);

	const imageIds = imagesIdObject?.map(({ _id, width, height }) => ({
		_id,
		width: width,
		height: height,
	}));

	return (
		<div className={s.album}>
			<Gallery imageIds={imageIds} />
		</div>
	);
}
