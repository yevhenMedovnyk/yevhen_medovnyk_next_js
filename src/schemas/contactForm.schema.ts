import * as yup from 'yup';

export const contactFormSchema = yup.object().shape({
	name: yup.string().required('Будь ласка, введіть ваше ім’я'),
	email: yup
		.string()
		.email('Введіть коректну e-mail адресу')
		.max(50, 'Максимальна кількість символів 50')
		.matches(
			/^[A-Z0-9_%+-]+(\.[A-Z0-9_%+-]+)*@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			'Введіть коректну e-mail адресу'
		)
		.required('Будь ласка, введіть вашу e-mail адресу'),
	message: yup.string().required('Будь ласка, введіть ваше повідомлення'),
});
