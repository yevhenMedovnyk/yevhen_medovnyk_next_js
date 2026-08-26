import path from 'path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	// Handlebars templates are loaded by nodemailer at runtime, so Next's file
	// tracer cannot discover them from a static import. Include them in every
	// API route that can call sendMail (contact form and order notifications).
	outputFileTracingIncludes: {
		'/api/send-mail': ['./src/views/**/*.hbs'],
		'/api/orders/update-order': ['./src/views/**/*.hbs'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src')],
	},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname, 'src');
		return config;
	},
};

export default withNextIntl(nextConfig);
