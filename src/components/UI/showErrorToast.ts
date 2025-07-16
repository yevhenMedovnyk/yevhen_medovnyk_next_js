import { toast } from 'sonner';

export const showErrorToast = (message: string, description?: string) => {
	toast.error(message, {
		description,
		icon: '❌',
		style: {
			backgroundColor: 'crimson',
			color: '#fff',
			border: '1px solid #e43e3e',
		},
	});
};
