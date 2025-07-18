'use client';

import React, { useEffect, useState } from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { useParams } from 'next/navigation';
import { baseUrl } from '@/constants';
import { useFetchClient } from '@/hooks/useFetchClient';

const Album = () => {
	const params = useParams();
	const slug = params.album as string;
	const [imagesIdObject, setImagesIdObject] = useState([]);

	const fetchClient = useFetchClient();

	useEffect(() => {
		if (!slug) return;

		const fetchImages = async () => {
			try {
				const data = await fetchClient(baseUrl + `images/image-id-in-album/${slug}`);
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
