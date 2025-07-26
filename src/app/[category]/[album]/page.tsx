import React from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { IAlbum } from '@/types/IAlbum';

interface ImageMinimal {
	_id: string;
	width: number;
	height: number;
}

interface Props {
	params: { category: string; album: string };
}

export async function getAlbum(slug: string): Promise<IAlbum | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/albums/${slug}`, {
			next: { revalidate: 3600, tags: ['Albums'] },
		});
		if (!res.ok) return null;
		return res.json();
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const album = await getAlbum(params.album);
	if (!album) return { title: 'Album not found' };
	return {
		title: album.name.ua + ' | Yevhen Medovnyk',
	};
}

async function getImagesMinimal(slug: string): Promise<ImageMinimal[] | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/images/minimal/${slug}`, {
			next: { revalidate: 3600, tags: ['Images'] },
		});
		if (!res.ok) return null;
		return res.json();
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default async function AlbumPage(props: Props) {
	const params = await props.params;
	const imagesIdObject = await getImagesMinimal(params.album);
	if (!imagesIdObject) return notFound();

	const imageIds = imagesIdObject.map(({ _id, width, height }) => ({
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
