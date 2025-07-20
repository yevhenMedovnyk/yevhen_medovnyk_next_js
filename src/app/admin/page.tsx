'use client';

import React from 'react';
import s from './clientOrders.module.scss';
import ClientOrder from '@/components/ClientOrder/ClientOrder';
import { IOrder } from '@/types/IOrder';
import { useFetchClient } from '@/hooks/useFetchClient';

const ClientOrders = () => {
	const [orders, setOrders] = React.useState<IOrder[]>([]);
	const fetchClient = useFetchClient();
	console.log('clientOrders', orders);

	React.useEffect(() => {
		const clientOrders = async () => {
			try {
				const data = await fetchClient(
					'/api/orders/get-orders',
					{
						method: 'GET',
					},
					true
				);
				setOrders(data);
			} catch (error: any) {
				return console.error(error.message);
			}
		};
		clientOrders();
	}, []);

	return (
		<div className={s.container}>
			{orders?.map((order) => (
				<ClientOrder key={order._id} {...order} />
			))}
		</div>
	);
};

export default ClientOrders;
