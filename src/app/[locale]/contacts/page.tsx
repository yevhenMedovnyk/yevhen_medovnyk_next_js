'use client';

import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { contactFormSchema } from '@/schemas/contactForm.schema';
import SocialNetLinksList from '@/components/SocialNetLinks/SocialNetLinks';
import s from './contacts.module.scss';
import Button from '@/components/UI/Button/Button';
import { showErrorToast } from '@/components/UI/showErrorToast';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import { useFetchClient } from '@/hooks/useFetchClient';
import {  useTranslations } from 'next-intl';

const Contacts: React.FC = () => {
	const initialValues = {
		name: '',
		email: '',
		message: '',
	};

	const t = useTranslations('Contacts');

	const fetchClient = useFetchClient();
	const onSubmit = async (
		values: typeof initialValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		try {
			const response = await fetchClient('/api/send-mail', {
				method: 'POST',
				body: JSON.stringify(values),
			});
			showSuccessToast(t('successMessage'));
			console.log('response', response);

			resetForm();
		} catch (error) {
			console.error('Send mail error:', error);
			showErrorToast(t('errorMessage'));
		}
	};

	return (
		<div className={s.container}>
			<div className={s.title}>
				{t.rich('title', {
					br: () => <br />,
				})}
			</div>
			<SocialNetLinksList variant="imgIcon" />
			<Formik
				initialValues={initialValues}
				validationSchema={contactFormSchema}
				onSubmit={onSubmit}
			>
				{() => (
					<Form className={s.form}>
						<div className={s.inputContainer}>
							<Field
								className={s.input}
								type="text"
								name="name"
								placeholder={t('form.namePlaceholder')}
								autoComplete="off"
							/>
							<ErrorMessage name="name" component="span" className={s.error} />
						</div>
						<div className={s.inputContainer}>
							<Field
								className={s.input}
								name="email"
								placeholder={t('form.emailPlaceholder')}
								autoComplete="off"
							/>
							<ErrorMessage name="email" component="span" className={s.error} />
						</div>
						<div className={s.textareaContainer}>
							<Field
								cols={30}
								rows={10}
								className={s.textarea}
								name="message"
								placeholder={t('form.messagePlaceholder')}
								autoComplete="off"
								as="textarea"
							/>
							<ErrorMessage name="message" component="span" className={s.error} />
						</div>
						<Button
							type="submit"
							name={t('form.submit')}
							class_name="contactPage"
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Contacts;
