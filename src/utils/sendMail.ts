import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import Handlebars from 'handlebars';
import addTrackingNumberMessage from '@/views/addTrackingNumberMessage.hbs';
import contactFormMessage from '@/views/contactFormMessage.hbs';
import newOrderMessage from '@/views/newOrderMessage.hbs';
import orderSuccessMessage from '@/views/orderSuccessMessage.hbs';
import styles from '@/views/partials/styles.hbs';
import { type Options as MailOptions } from 'nodemailer/lib/mailer';

const templates = {
	addTrackingNumberMessage,
	contactFormMessage,
	newOrderMessage,
	orderSuccessMessage,
} as const;

Handlebars.registerPartial('styles', styles);
Handlebars.registerHelper('multiply', (a: number, b: number) => a * b);

//Налаштування транспорту
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});

interface SendMailOptions {
	email: string;
	name: string;
	message?: string;
	subject?: string;
	templateName?: string;
	context?: Record<string, unknown>;
	emailTo?: string;
}

export const sendMail = async ({
	email,
	name,
	message = '',
	subject = 'YM | Contact Form Message',
	templateName = 'contactFormMessage',
	context = {},
	emailTo,
}: SendMailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> => {
	try {
		const template = templates[templateName as keyof typeof templates];
		if (!template) {
			throw new Error(`Unknown email template: ${templateName}`);
		}

		const cleanEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
		const cleanName = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} });
		const cleanMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

		const templateContext =
			templateName === 'contactFormMessage'
				? { name: cleanName, email: cleanEmail, message: cleanMessage }
				: context;

		const mailOptions: MailOptions = {
			from: process.env.GMAIL_USER!,
			replyTo: emailTo ? process.env.GMAIL_USER : cleanEmail,
			to: emailTo || process.env.GMAIL_USER!,
			subject,
			html: Handlebars.compile(template)(templateContext, {
				allowProtoPropertiesByDefault: true,
				allowProtoMethodsByDefault: true,
			}),
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('✅ Email sent:', info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error: any) {
		console.error('❌ Email send error:', error.message);
		return { success: false, error: error.message };
	}
};
