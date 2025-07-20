import { toast } from 'sonner';

export const showSuccessToast = (
	message: string | React.ReactNode,
	description?: string | React.ReactNode,
	duration?: number
) => {
	toast.success(message, {
		description,
		duration: duration || 2000,
		style: {
			color: 'mediumseagreen',
		},
	});
};
