import React from 'react';
import s from './Gallery.module.scss';
import LazyImage from '@/components/LazyImage/LazyImage';
import clsx from 'clsx';

import { IImage } from '../../types/IImage';

interface GalleryProps {
	imageIds?: { _id: string; width: number; height: number }[];
	images?: IImage[];
	variant?: string;
	onClickDeleteImage?: (index: number, id?: string) => void;
	editMode?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({
	images: imageList = [],
	imageIds: imageIdList = [],
	variant,
	onClickDeleteImage,
	editMode,
}) => {
	return (
		<div className={clsx(s.container, variant && s[variant])}>
			{imageIdList.length > 0
				? imageIdList.map(({ _id: imageId, width, height }, index) => (
						<LazyImage
							key={imageId ?? index}
							imageId={imageId}
							width={width}
							height={height}
							onClickDelete={
								onClickDeleteImage ? () => onClickDeleteImage(index, imageId) : undefined
							}
							alt="Gallery image"
						/>
					))
				: imageList?.map(({ img, name, _id, description }, index) => (
						<LazyImage
							key={_id || index}
							img={img}
							imageId={_id}
							description={description}
							onClickDelete={onClickDeleteImage ? () => onClickDeleteImage(index, _id) : undefined}
							alt={name}
							editMode={editMode}
						/>
					))}
		</div>
	);
};

export default Gallery;
