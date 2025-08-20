import React from 'react';
import s from './privacy.module.scss';
import parse from 'html-react-parser';

export async function getPrivacyPolicyInfo() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/privacy-policy`, {
			next: { revalidate: 3600, tags: ['PrivacyPolicy'] },
		});

		return res.json();
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

const PrivacyPolicy = async () => {
	const privacyPolicyInfo = await getPrivacyPolicyInfo();

	return (
		<div className={s.container}>
			{privacyPolicyInfo?.content ? parse(privacyPolicyInfo.content) : null}
		</div>
	);
};

export default PrivacyPolicy;
