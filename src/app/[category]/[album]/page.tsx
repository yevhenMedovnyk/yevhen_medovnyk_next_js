'use client';

import React, { useEffect, useState } from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { useParams } from 'next/navigation';
import { useFetchClient } from '@/hooks/useFetchClient';

interface ImageId {
	_id: string;
	width: number;
	height: number;
}

const Album = () => {
	const params = useParams();
	const slug = params.album as string;
	const [imagesIdObject, setImagesIdObject] = useState<ImageId[]>([]);

	const fetchClient = useFetchClient();

	useEffect(() => {
		if (!slug) return;

		const fetchImages = async () => {
			try {
				const data = await fetchClient(`/api/images/images-id/${slug}`);
				setImagesIdObject(data);
			} catch (err) {
				console.error('Помилка завантаження зображень:', err);
			}
		};

		fetchImages();
	}, [slug]);

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
};

export default Album;
