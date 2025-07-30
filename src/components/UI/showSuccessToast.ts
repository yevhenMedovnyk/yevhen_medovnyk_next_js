import { toast } from 'sonner';

export const showSuccessToast = (
	message: string | React.ReactNode,
	description?: string | React.ReactNode,
	duration?: number
) => {
	toast.success(message, {
		description,
		duration: duration || 5000,
		style: {
			color: 'forestgreen',
		},
	});
};
