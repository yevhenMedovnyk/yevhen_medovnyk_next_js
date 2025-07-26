'use client';

import React, { useEffect, useMemo, useState } from 'react';
import s from './createEditAlbum.module.scss';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import Gallery from '../../../components/Gallery/Gallery';
import { IImage } from '../../../types/IImage';
import { useRouter, useParams } from 'next/navigation';
import { IAlbum } from '@/types/IAlbum';
import { useFetchClient } from '@/hooks/useFetchClient';
import { createAlbumSchema } from '@/schemas/createAlbum.schema';

const CreateOrEditAlbum = () => {
	const router = useRouter();
	const slug = useParams().album as string;
	const [images, setImages] = useState<IImage[]>([]);
	const [albumData, setAlbumData] = useState<IAlbum | null>(null);
	const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
	const [isAlbumCreated, setIsAlbumCreated] = useState(false);
	const [isUpdatingAlbum, setIsUpdatingAlbum] = useState(false);
	const [isUploadingImages, setIsUploadingImages] = useState(false);
	const [coverPreview, setCoverPreview] = useState<string | null>(null);
	const [imagePreviews, setImagePreviews] = useState<IImage[]>([]);
	const [albumName, setAlbumName] = useState({
		ua: '',
		en: '',
	});
	const [albumFiles, setAlbumFiles] = useState<File[]>([]);

	const fetchClient = useFetchClient();

	//Тимчасово
	const lang = 'ua';

	const initialValues = useMemo(
		() => ({
			name: {
				ua: albumData?.name?.ua ?? '',
				en: albumData?.name?.en ?? '',
			},
			cover_img: null as File | null,
			category: albumData?.category ?? 'gallery',
			album_images: [] as File[],
		}),
		[albumData]
	);

	useEffect(() => {
		// Завантажити зображення з альбому
		const getImages = async () => {
			try {
				const data = await fetchClient(
					`/api/albums/album/images/${slug}`,
					{
						method: 'GET',
					},
					true
				);
				setImages(data);
			} catch (err) {
				console.error('Помилка завантаження зображень:', err);
			}
		};

		const getAlbum = async () => {
			try {
				const data = await fetchClient(`/api/albums/${slug}`, {
					method: 'GET',
				});
				setAlbumData(data);
			} catch (err) {
				console.error('Помилка завантаження зображень:', err);
			}
		};

		getAlbum();
		getImages();
	}, [slug]);

	useEffect(() => {
		if (albumData) {
			setAlbumName({
				ua: albumData.name.ua,
				en: albumData.name.en,
			});
			setCoverPreview(albumData.cover_img);
		}
	}, [albumData]);

	const onSubmit = async (
		values: typeof initialValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		if (!values.cover_img && !albumData?.cover_img) {
			alert('Будь ласка, оберіть обкладинку альбому');
			return;
		}

		const convertToBase64 = (file: File): Promise<string> => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = reject;
			});
		};

		try {
			const coverBase64 = values.cover_img
				? await convertToBase64(values.cover_img)
				: albumData?.cover_img;

			let finalAlbumId = albumData?._id;
			let album_slug;

			if (albumData) {
				// Оновити існуючий альбом
				const album = await fetchClient(
					`/api/albums/update`,
					{
						method: 'PUT',
						body: JSON.stringify({
							albumId: albumData._id,
							name: values.name,
							category: values.category,
							cover_img: coverBase64 || albumData.cover_img,
						}),
					},
					true
				);
				setIsUpdatingAlbum(true);
				console.log('✅ Альбом оновлено');
				setIsUpdatingAlbum(false);
				album_slug = album.slug;
			} else {
				// Створити новий альбом
				const album = await fetchClient(
					`/api/albums/create`,
					{
						method: 'POST',
						body: JSON.stringify({
							name: values.name ?? '',
							category: values.category ?? '',
							cover_img: coverBase64 ?? '',
							slug: '',
						}),
					},
					true
				);
				setIsCreatingAlbum(true);
				if (!album || !album._id) {
					throw new Error('Не вдалося отримати ID альбому');
				}

				console.log('✅ Альбом створено');
				setIsAlbumCreated(true);
				setIsCreatingAlbum(false);
				finalAlbumId = album._id;
				album_slug = album.slug;
			}

			if (albumFiles.length > 0 && finalAlbumId && album_slug) {
				const formData = new FormData();

				albumFiles.forEach((file) => {
					formData.append('images', file); // 'images' - це те, як названо поле у бекенді
				});

				formData.append('album_id', finalAlbumId.toString());

				if (album_slug) {
					formData.append('album_slug', album_slug);
				}

				// Завантажити зображення
				try {
					setIsUploadingImages(true);

					await fetchClient(
						`/api/images/upload`,
						{
							method: 'POST',
							body: formData,
						},
						true
					);
					console.log('✅ Зображення завантажені');
				} catch (error) {
					console.error('Помилка завантаження зображень:', error);
				} finally {
					setIsUploadingImages(false);
				}
			}

			resetForm();
			setCoverPreview(null);
			setImagePreviews([]);
			setAlbumFiles([]);
			router.push(`/${values.category}/${album_slug}`);
		} catch (err) {
			console.error('❌ Помилка при створенні/оновленні альбому:', err);
			alert('Не вдалося створити або оновити альбом. Спробуйте ще раз.');
		}
	};

	const handleNameChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<typeof initialValues>['setFieldValue']
	) => {
		const { name, value } = event.target; // name буде "name.ua" або "name.en"
		setFieldValue(name, value); // встановлюємо напряму вкладене поле
		setAlbumName((prev) => ({
			...prev,
			[name.split('.')[1]]: value, // ua або en
		}));
	};

	const handleCoverChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<typeof initialValues>['setFieldValue']
	) => {
		const file = event.target.files?.[0] || null;
		setFieldValue('cover_img', file);

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => setCoverPreview(reader.result as string);
		}
	};

	const handleImagesChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<typeof initialValues>['setFieldValue']
	) => {
		const files = event.target.files ? Array.from(event.target.files) : [];
		setFieldValue('album_images', files);
		setAlbumFiles(files);

		const previews = files.map((file) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			return new Promise<{ img: string; name: string }>((resolve) => {
				reader.onload = () => resolve({ img: reader.result as string, name: file.name });
			});
		});

		Promise.all(previews).then(setImagePreviews as any);
	};

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
		setFieldValue: FormikHelpers<typeof initialValues>['setFieldValue']
	) => {
		setFieldValue('category', event.target.value);
	};

	const deleteImage = async (index: number, _id?: string) => {
		if (_id) {
			await fetchClient(
				`/api/images/image/${_id}`,
				{
					method: 'DELETE',
				},
				true
			);
			setImages((prev) => prev.filter((img) => img._id !== _id));
		} else {
			const newFiles = [...albumFiles];
			const newPreviews = [...imagePreviews];

			newFiles.splice(index, 1);
			newPreviews.splice(index, 1);
			setAlbumFiles(newFiles);
			setImagePreviews(newPreviews);
		}
	};

	return (
		<div className={s.container}>
			<h1 className={s.title}>Створення альбому</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={createAlbumSchema}
				onSubmit={onSubmit}
				enableReinitialize={true}
			>
				{(formik) => (
					<Form className={s.form}>
						<div className={s.nameAndCoverAndCoverImg}>
							<div className={s.nameAndCover}>
								<div className={s.inputContainer}>
									<input
										className={s.input}
										type="text"
										placeholder="Назва альбому"
										{...formik.getFieldProps('name.ua')}
										onChange={(event) => handleNameChange(event, formik.setFieldValue)}
									/>
									<ErrorMessage name="name.ua" component="span" className={s.error} />
								</div>
								<div className={s.inputContainer}>
									<input
										className={s.input}
										type="text"
										placeholder="Album name"
										{...formik.getFieldProps('name.en')}
										onChange={(event) => handleNameChange(event, formik.setFieldValue)}
									/>
									<ErrorMessage name="name.en" component="span" className={s.error} />
								</div>

								<div className={s.inputContainer}>
									<label htmlFor="cover_img" className={s.label}>
										Обкладинка альбому:
									</label>
									<input
										className={s.input}
										type="file"
										id="cover_img"
										name="cover_img"
										accept="image/*"
										onChange={(event) => handleCoverChange(event, formik.setFieldValue)}
									/>

									<ErrorMessage name="cover_img" component="span" className={s.error} />
								</div>
								<div className={s.inputContainer}>
									<label htmlFor="album_images" className={s.label}>
										Додати зображення до альбому:
									</label>
									<input
										className={s.input}
										type="file"
										id="album_images"
										name="album_images"
										accept="image/*"
										multiple
										onChange={(event) => handleImagesChange(event, formik.setFieldValue)}
									/>
									<ErrorMessage name="album_images" component="span" className={s.error} />
								</div>
								<div className={s.inputContainer}>
									<label htmlFor="category-select" className={s.label}>
										Категорія:
									</label>
									<select
										id="category-select"
										className={s.select}
										{...formik.getFieldProps('category')}
										onChange={(event) => handleCategoryChange(event, formik.setFieldValue)}
									>
										<option value="gallery">Галерея</option>
										<option value="projects">Проєкти</option>
									</select>
									<ErrorMessage name="category" component="span" className={s.error} />
								</div>
							</div>
							<div className={s.coverPreviewContainer}>
								<div className={s.coverPreview}>
									{coverPreview || albumData?.cover_img ? (
										<img
											src={coverPreview === null ? albumData?.cover_img : coverPreview}
											alt="Обкладинка"
											className={s.previewImage}
										/>
									) : null}
								</div>
								<span className={s.albumName}>{lang === 'ua' ? albumName.ua : albumName.en}</span>
							</div>
						</div>

						<button
							disabled={isUploadingImages || isCreatingAlbum || isAlbumCreated || isUpdatingAlbum}
							className={s.submitBtn}
							type="submit"
						>
							{isCreatingAlbum
								? 'Створюється альбом...'
								: isUploadingImages
									? 'Завантажуються зображення...'
									: isUpdatingAlbum
										? 'Оновлюється альбом...'
										: slug
											? 'Оновити альбом'
											: 'Створити альбом'}
						</button>
					</Form>
				)}
			</Formik>
			<Gallery
				images={[...imagePreviews, ...images]}
				onClickDeleteImage={deleteImage}
				variant="createEditAlbum"
				editMode={true}
			/>
		</div>
	);
};

export default CreateOrEditAlbum;
