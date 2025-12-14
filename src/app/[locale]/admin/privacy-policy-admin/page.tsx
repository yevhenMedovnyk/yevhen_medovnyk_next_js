'use client';

import React, { useEffect } from 'react';
import QuillEditor from '@/components/QuillEditor/QuillEditor';
import Button from '@/components/UI/Button/Button';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import { showErrorToast } from '@/components/UI/showErrorToast';
import { useLocale } from 'next-intl';
import { IPrivacyPolicy } from '@/types/IPrivacyPolicy';

const PrivacyPolicyAdmin = () => {
	const [content, setContent] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const locale = useLocale();
	const currentLocale = locale as keyof IPrivacyPolicy['content'];

	useEffect(() => {
		const fetchContent = async () => {
			try {
				const response = await fetch('/api/admin/privacy-policy', {
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
			const response = await fetch('/api/admin/privacy-policy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ locale: currentLocale, content }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || 'Помилка при збереженні');
			}
			showSuccessToast('Збережено');
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			showErrorToast('Помилка при збереженні');
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

export default PrivacyPolicyAdmin;
