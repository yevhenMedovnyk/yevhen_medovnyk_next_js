import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'nodemailer-express-handlebars';
import { type Options as MailOptions } from 'nodemailer/lib/mailer';

//Розширюємо тип для підтримки `template` та `context`
interface HbsMailOptions extends MailOptions {
	template: string;
	context: Record<string, unknown>;
}

//Шлях до шаблонів (для Next.js ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Налаштування транспорту
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});

//Handlebars налаштування
transporter.use(
	'compile',
	hbs({
		viewEngine: {
			extname: '.hbs',
			partialsDir: path.join(__dirname, '../views/partials'),
			defaultLayout: false,
			runtimeOptions: {
				allowProtoPropertiesByDefault: true,
				allowProtoMethodsByDefault: true,
			},
			helpers: {
				multiply: (a: number, b: number) => a * b,
			},
		},
		viewPath: path.join(__dirname, '../views'),
		extName: '.hbs',
	})
);

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
		const cleanEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
		const cleanName = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} });
		const cleanMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

		const mailOptions: HbsMailOptions = {
			from: process.env.GMAIL_USER!,
			replyTo: emailTo ? process.env.GMAIL_USER : cleanEmail,
			to: emailTo || process.env.GMAIL_USER!,
			subject,
			template: templateName,
			context:
				templateName === 'contactFormMessage'
					? { name: cleanName, email: cleanEmail, message: cleanMessage }
					: context,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('✅ Email sent:', info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error: any) {
		console.error('❌ Email send error:', error.message);
		return { success: false, error: error.message };
	}
};
