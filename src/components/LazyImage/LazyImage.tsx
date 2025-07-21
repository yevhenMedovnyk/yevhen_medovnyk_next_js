'use client';

import React, {useEffect, useState } from 'react';
import s from './LazyImage.module.scss';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import { TiDelete } from 'react-icons/ti';
import clsx from 'clsx';
import Button from '../UI/Button/Button';
import { useFetchClient } from '@/hooks/useFetchClient';

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

		const fetchClient = useFetchClient();

		const [loadImage, setLoadImage] = useState(false);
		const [image, setImage] = useState<any>(null);
		const [isLoading, setIsLoading] = useState(false);
		const [isLoaded, setIsLoaded] = useState(false);
		const [imageDesc, setImageDesc] = useState({
			ua: description?.ua || '',
			en: description?.en || '',
		});
		const [isSaving, setIsSaving] = useState(false);
		const [saveSuccess, setSaveSuccess] = useState(false);

		const shouldFetch = !img && loadImage && !!imageId;

		useEffect(() => {
			if (inView) setLoadImage(true);
		}, [inView]);

		useEffect(() => {
			if (shouldFetch) {
				setIsLoading(true);
				fetchClient(`/api/images/image/${imageId}`, { method: 'GET' })
					.then((data) => setImage(data))
					.catch(console.error)
					.finally(() => setIsLoading(false));
			}
		}, [shouldFetch, imageId]);

		const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setImageDesc({
				...imageDesc,
				[e.target.name]: e.target.value,
			});
			setSaveSuccess(false);
		};

		const handleSaveDescription = async () => {
			setIsSaving(true);
			try {
				await fetchClient(`/api/images/image/description/${imageId}`, {
					method: 'PATCH',
					body: JSON.stringify({ description: imageDesc }),
				});
				setSaveSuccess(true);
			} catch (err) {
				console.error(err);
			} finally {
				setIsSaving(false);
			}
		};

		const stableImgSrc = image?.img || img;
		const stableAlt = image?.name || alt;

		return (
			<div ref={ref} className={s.imageContainer}>
				{onClickDelete && <TiDelete className={s.deleteIcon} onClick={onClickDelete} />}

				{!isLoading && stableImgSrc ? (
					<img
						src={stableImgSrc}
						alt={stableAlt}
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
							placeholder="Опис українською"
						/>
						<textarea
							className={s.descriptionInput}
							value={imageDesc.en}
							onChange={handleDescriptionChange}
							name="en"
							placeholder="Description in English"
						/>
						<Button
							name={saveSuccess ? 'Збережено' : 'Зберегти'}
							class_name="addDesc"
							onClick={handleSaveDescription}
							disabled={isSaving || !imageDesc.ua || !imageDesc.en || saveSuccess}
						/>
					</>
				)}

				{image?.description?.ua && !editMode && (
					<span className={s.description}>{image.description.ua}</span>
				)}
			</div>
		);
	}
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
