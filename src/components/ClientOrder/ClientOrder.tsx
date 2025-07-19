'use client';

import React from 'react';
import s from './ClientOrder.module.scss';
import { IOrder } from '../../types/IOrder';
import Button from '../UI/Button/Button';
import { showSuccessToast } from '../UI/showSuccessToast';
import Link from 'next/link';
import { useFetchClient } from '@/hooks/useFetchClient';

const img =
	'https://res.cloudinary.com/yevhenmedovnyk/image/upload/v1751304457/Frame_cow_bf_uiulsu.webp';

const ClientOrder: React.FC<IOrder> = ({
	_id: order_id,
	amount,
	comment,
	deliveryRecipientInfo,
	mainClientInfo,
	products,
	delivery_branch_address,
	dateCreate,
	basket_id: order_number,
	tracking_number,
}) => {
	const [inputTTNValue, setInputTTNValue] = React.useState(tracking_number || '');
	const [isLoading, setIsLoading] = React.useState(false);
	const fetchClient = useFetchClient();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputTTNValue(event.target.value);
	};


	const handleUpdateTTN = async () => {
		try {
			setIsLoading(true);
			await fetchClient(
				'/api/orders/update-order',
				{
					method: 'PUT',
					body: JSON.stringify({ order_id, tracking_number: inputTTNValue }),
				},
				true
			);
			console.log('ТТН оновлено');
			showSuccessToast('ТТН оновлено');
			setIsLoading(false);
		} catch (error) {
			console.error('Помилка оновлення ТТН:', error);
			showSuccessToast('Помилка оновлення ТТН');
		}
	};

	return (
		<div className={s.orderWrapper}>
			<div className={s.orderTitle}>
				<div className={s.orderNumber}>
					<span>Замовлення №:</span> {order_number}
				</div>
				<div className={s.totalAmount}>
					<span>Загальна сума:</span> {amount} грн
				</div>
			</div>
			<div className={s.container}>
				<div className={s.productsContainer}>
					{products.map((product) => (
						<div key={product._id} className={s.productContainer}>
							<div className={s.productInfo}>
								<div className={s.name}>
									<span>Назва:</span> {product.name}
								</div>
								<div className={s.price}>
									<span>Ціна:</span> {product.price} грн
								</div>
								<div className={s.quantity}>
									<span>Кількість:</span> {product.cnt}
								</div>
							</div>
							<Link href={`/store/${product.code_product}`} className={s.orderImg}>
								<img src={img} alt="album_cover" />
							</Link>
						</div>
					))}
				</div>
				<div className={s.orderInfo}>
					<div className={s.deliveryInfo}>
						<div>
							<span>Адреса доставки:</span> {delivery_branch_address}
						</div>
						<div className={s.name}>
							<span>Клієнт:</span>{' '}
							{deliveryRecipientInfo.first_name + ' ' + deliveryRecipientInfo.last_name}
						</div>
						<div>
							<span>Телефон:</span> {deliveryRecipientInfo.phoneNumber}
						</div>
						<div>
							<span>Пошта:</span> {mainClientInfo.email?.toLocaleLowerCase()}
						</div>
					</div>
					<div>
						<span>Дата замовлення:</span> {dateCreate}
					</div>
					<div>
						<span>Коментар:</span> {comment}
					</div>
					<div className={s.trackingNumber}>
						<span>ТТН:</span>{' '}
						<input
							className={s.inputTTN}
							onChange={handleInputChange}
							type="text"
							value={inputTTNValue}
							placeholder="Введіть номер ТТН"
						/>
						<Button
							name="Відправити"
							class_name="order"
							onClick={handleUpdateTTN}
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClientOrder;
