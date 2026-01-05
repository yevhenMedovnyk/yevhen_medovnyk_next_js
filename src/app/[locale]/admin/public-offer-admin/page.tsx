'use client';

import React, { useEffect } from 'react';
import QuillEditor from '@/components/QuillEditor/QuillEditor';
import Button from '@/components/UI/Button/Button';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import { showErrorToast } from '@/components/UI/showErrorToast';
import { useLocale } from 'next-intl';
import { IPublicOffer } from '@/types/IPublicOffer';

const PublicOfferAdmin = () => {
	const [content, setContent] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const locale = useLocale();
	const currentLocale = locale as keyof IPublicOffer['content'];

	useEffect(() => {
		const fetchContent = async () => {
			try {
				const response = await fetch('/api/admin/public-offer', {
					method: 'GET',
				});
				const data = await response.json();
				setContent(data.content[currentLocale]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchContent();
	}, [currentLocale]);

	const onSubmit = async (content: string) => {
		try {
			setIsLoading(true);
			await fetch('/api/admin/public-offer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ locale: currentLocale, content }),
			});
			showSuccessToast('Збережено');
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			showErrorToast('Помилка');
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<QuillEditor value={content} onChange={setContent} />
			<Button
				name={'Зберегти'}
				onClick={() => onSubmit(content)}
				type="submit"
				class_name="admin"
				disabled={isLoading || !content}
			/>
		</div>
	);
};

export default PublicOfferAdmin;
