"use client";

import React, { useEffect, useState } from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { useSearchParams } from 'next/navigation';
import { useGetImageIdsQuery } from '../../../redux/imagesApi';
import { baseUrl } from '@/constants';

const Album = () => {
	const searchParams = useSearchParams();
	const albumId = searchParams.get('id');
	const [imagesIdObject, setImagesIdObject] = useState([]);

	useEffect(() => {
		if (!albumId) return;

		const fetchImages = async () => {
			try {
				const res = await fetch(baseUrl + `images/image-id-in-album?albumId=${albumId}`);
				const data = await res.json();
				setImagesIdObject(data);
			} catch (err) {
				console.error('Помилка завантаження зображень:', err);
			}
		};

		fetchImages();
	}, [albumId]);

	console.log(imagesIdObject);


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
