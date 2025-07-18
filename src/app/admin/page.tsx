"use client";

import React from 'react';
import s from './clientOrders.module.scss';
import { useGetOrdersQuery } from '../../redux/ordersApi';
import ClientOrder from '@/components/ClientOrder/ClientOrder';

const ClientOrders = () => {
	const { data: clientOrders } = useGetOrdersQuery();

	console.log('clientOrders', clientOrders);

	return (
		<div className={s.container}>
			{clientOrders?.map((order) => <ClientOrder key={order._id} {...order} />)}
		</div>
	);
};

export default ClientOrders;
