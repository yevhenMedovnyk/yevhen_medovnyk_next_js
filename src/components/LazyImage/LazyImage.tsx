"use client";

import React, { useEffect, useState } from 'react';
import s from './LazyImage.module.scss';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import { TiDelete } from 'react-icons/ti';
import { useAddImageDescriptionMutation, useGetImageQuery } from '../../redux/imagesApi';
import clsx from 'clsx';
import Button from '../UI/Button/Button';

interface LazyImageProps {
	imageId?: string;
	img?: string;
	alt: string;
	width?: number;
	height?: number;
	onClickDelete?: () => void;
	editMode?: boolean;
	description?: {
		ua: string;
		en: string;
	};
}

const LazyImage: React.FC<LazyImageProps> = React.memo(
	({ img, imageId = '', alt, onClickDelete, width, height, editMode = false, description }) => {
		const { ref, inView } = useInView({
			threshold: 0,
			triggerOnce: true,
		});

		const [loadImage, setLoadImage] = useState(false);
		const [imageDesc, setImageDesc] = useState({
			ua: description?.ua || '',
			en: description?.en || '',
		});
		const [isLoaded, setIsLoaded] = useState(false);

		const shouldFetch = !img && loadImage && !!imageId;

		const { data: image, isLoading } = useGetImageQuery(imageId, {
			skip: !shouldFetch,
		});

		useEffect(() => {
			if (inView) {
				setLoadImage(true);
			}
		}, [inView]);

		const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setImageDesc({
				...imageDesc,
				[e.target.name]: e.target.value,
			});
		};

		const [saveDesc, { isLoading: isDescLoading, isSuccess }] = useAddImageDescriptionMutation();

		const stableImgSrc = image?.img || img;

		return (
			<div ref={ref} className={s.imageContainer}>
				{onClickDelete && <TiDelete className={s.deleteIcon} onClick={onClickDelete} />}
				{!isLoading && stableImgSrc ? (
					<img
						src={stableImgSrc}
						alt={image?.name || alt}
						onLoad={() => setIsLoaded(true)}
						className={clsx(s.image, editMode && s.editMode, isLoaded && s.fadeInImage)}
						width={width}
						height={height}
					/>
				) : (
					<div
						className={s.placeholder}
						style={width && height ? { aspectRatio: `${width} / ${height}` } : {}}
					>
						<ClipLoader color="#b0bab8" size={50} />
					</div>
				)}
				{editMode && imageId && (
					<>
						<textarea
							className={s.descriptionInput}
							value={imageDesc.ua}
							onChange={handleDescriptionChange}
							name="ua"
							placeholder="Опис українською"
						/>
						<textarea
							className={s.descriptionInput}
							value={imageDesc.en}
							onChange={handleDescriptionChange}
							name="en"
							placeholder="Description in English"
						/>
						<Button
							name={isSuccess ? 'Збережено' : 'Зберегти'}
							class_name="addDesc"
							onClick={() => saveDesc({ imageId, description: imageDesc }).unwrap()}
							disabled={isDescLoading || !imageDesc || isSuccess}
						/>
					</>
				)}
				{image?.description && <span className={s.description}>{image?.description?.ua} </span>}
			</div>
		);
	}
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
