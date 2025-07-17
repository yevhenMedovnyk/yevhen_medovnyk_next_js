"use client";

import React, { useEffect, useMemo, useState } from 'react';
import s from './createEditAlbum.module.scss';
import {
	useCreateAlbumMutation,
	useGetAlbumByIdQuery,
	useUpdateAlbumMutation,
} from '../../redux/albumsApi';
import {
	useDeleteImageMutation,
	useGetImagesQuery,
	useUploadImagesMutation,
} from '../../redux/imagesApi';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import Gallery from '../../components/Gallery/Gallery';
import { IImage } from '../../types/IImage';
import { useSearchParams, useRouter } from 'next/navigation';

const CreateOrEditAlbum = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const albumId = searchParams.get('albumId') as string;
	const [addAlbum, { isLoading: isCreatingAlbum, isSuccess: isAlbumCreated }] =
		useCreateAlbumMutation();
	const [uploadImages, { isLoading: isUploadingImages }] = useUploadImagesMutation();
	const { data: images = [] } = useGetImagesQuery(albumId, { skip: !albumId });
	const { data: albumData } = useGetAlbumByIdQuery(albumId, { skip: !albumId });
	const [updateAlbum, { isLoading: isUpdatingAlbum }] = useUpdateAlbumMutation();

	const [deleteImageById] = useDeleteImageMutation();

	const [coverPreview, setCoverPreview] = useState<string | null>(null);
	const [imagePreviews, setImagePreviews] = useState<IImage[]>([]);
	const [albumName, setAlbumName] = useState({
		ua: '',
		en: '',
	});
	const [albumFiles, setAlbumFiles] = useState<File[]>([]);

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

			let finalAlbumId = albumId;

			if (albumData) {
				await updateAlbum({
					albumId: albumId,
					name: values.name,
					category: values.category,
					cover_img: coverBase64 || albumData.cover_img,
				}).unwrap();
				console.log('✅ Альбом оновлено');
			} else {
				const album = await addAlbum({
					name: values.name ?? '',
					category: values.category ?? '',
					cover_img: coverBase64 ?? '',
				}).unwrap();

				if (!album || !album._id) {
					throw new Error('Не вдалося отримати ID альбому');
				}

				console.log('✅ Альбом створено');
				finalAlbumId = String(album._id);
			}

			if (albumFiles.length > 0 && finalAlbumId) {
				const formData = new FormData();

				albumFiles.forEach((file) => {
					formData.append('images', file); // 'images' - це те, як названо поле у бекенді
				});

				formData.append('album_id', finalAlbumId);

				await uploadImages(formData).unwrap();
				console.log('✅ Зображення завантажені');
			}

			resetForm();
			setCoverPreview(null);
			setImagePreviews([]);
			setAlbumFiles([]);
			router.push(`/category/${values.category}?id=${finalAlbumId}`);
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
		setFieldValue(name, value); // ✅ встановлюємо напряму вкладене поле
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

		Promise.all(previews).then(setImagePreviews);
	};

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<typeof initialValues>['setFieldValue']
	) => {
		setFieldValue('category', event.target.value);
	};

	const deleteImage = async (index: number, _id?: string) => {
		if (_id) {
			await deleteImageById(_id).unwrap();
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
			<Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
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
									<label className={s.label}>Обкладинка альбому:</label>
									<input
										className={s.input}
										type="file"
										accept="image/*"
										onChange={(event) => handleCoverChange(event, formik.setFieldValue)}
									/>

									<ErrorMessage name="cover_img" component="span" className={s.error} />
								</div>
								<div className={s.inputContainer}>
									<label className={s.label}>Додати зображення до альбому:</label>
									<input
										className={s.input}
										type="file"
										accept="image/*"
										multiple
										onChange={(event) => handleImagesChange(event, formik.setFieldValue)}
									/>
									<ErrorMessage name="album_images" component="span" className={s.error} />
								</div>
								<div className={s.inputContainer}>
									<label className={s.label}>Категорія:</label>
									<input
										className={s.input}
										type="text"
										placeholder="Категорія альбому"
										{...formik.getFieldProps('category')}
										onChange={(event) => handleCategoryChange(event, formik.setFieldValue)}
									/>
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
										: albumId
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
