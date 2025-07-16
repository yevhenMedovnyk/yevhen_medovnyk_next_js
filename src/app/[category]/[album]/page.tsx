"use client";

import React from 'react';
import s from './album.module.scss';
import Gallery from '@/components/Gallery/Gallery';
import { useGetImageIdsQuery } from '../../../redux/imagesApi';
import {useParams, useSearchParams } from 'next/navigation';

const Album: React.FC = () => {
	const searchParams = useSearchParams();
	const albumId = searchParams.get('id') as string;

	const { data: imageIdsObject = [] } = useGetImageIdsQuery(albumId);

	const imageIds = imageIdsObject.map(({ _id, width, height }) => ({
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
