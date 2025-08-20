import React from 'react';
import s from './publicOffer.module.scss';
import parse from 'html-react-parser';

async function getPublicOfferInfo() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/public-offer`, {
			next: { revalidate: 3600, tags: ['PublicOffer'] },
		});

		return res.json();
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

export default async function PublicOffer() {
	const publicOfferInfo = await getPublicOfferInfo();

	return (
		<div className={s.container}>
			{publicOfferInfo?.content ? parse(publicOfferInfo.content) : null}
		</div>
	);
}
