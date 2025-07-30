import { toast } from 'sonner';

export const showErrorToast = (message: string, description?: string) => {
	toast.error(message, {
		description: description || 5000,
		icon: '❌',
		style: {
			backgroundColor: 'crimson',
			color: '#fff',
			border: '1px solid #e43e3e',
		},
	});
};
