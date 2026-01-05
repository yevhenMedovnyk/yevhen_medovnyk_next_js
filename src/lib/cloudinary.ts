import { v2 as cloudinary } from 'cloudinary';

let cloudinaryVars = {
	cloudinary_name: '',
	cloudinary_api_key: '',
	cloudinary_api_secret: '',
};

try {
	const parsed = JSON.parse(process.env.CLOUDINARY || '{}');

	if (
		typeof parsed.cloudinary_name === 'string' &&
		typeof parsed.cloudinary_api_key === 'string' &&
		typeof parsed.cloudinary_api_secret === 'string'
	) {
		cloudinaryVars = parsed;
	} else {
		console.warn('❗️CLOUDINARY env is missing required fields or has incorrect types.');
	}
} catch (error) {
	console.error('❌ Failed to parse CLOUDINARY env variable as JSON:', error);
}

cloudinary.config({
	cloud_name: cloudinaryVars.cloudinary_name,
	api_key: cloudinaryVars.cloudinary_api_key,
	api_secret: cloudinaryVars.cloudinary_api_secret,
	secure: true,
});

export default cloudinary;
