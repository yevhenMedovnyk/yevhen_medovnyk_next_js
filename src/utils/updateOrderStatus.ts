import Order from '@/models/Order';
import { sendMail } from './sendMail';

export const updateOrderStatus = async (
	orderRef: string,
	status: string
): Promise<{ success: boolean; message: string }> => {
	try {
		const order = await Order.findOne({ orderId: orderRef });

		if (!order) {
			console.log(`❌ Замовлення з order_ref ${orderRef} не знайдено.`);
			return { success: false, message: 'Order not found' };
		}

		order.generalStatus = status;
		await order.save();

		if (status === 'success') {
			await sendMail({
				email: '',
				emailTo: order.mainClientInfo.email,
				name: order.mainClientInfo.first_name,
				subject: 'Замовлення успішно прийняте',
				templateName: 'orderSuccessMessage',
				context: { order },
			});
		}

		console.log(`✅ Статус замовлення ${orderRef} оновлено до: ${status}`);
		return { success: true, message: 'Order updated successfully' };
	} catch (error: any) {
		console.error('❌ Помилка при оновленні статусу замовлення:', error.message);
		return { success: false, message: 'Server error' };
	}
};
