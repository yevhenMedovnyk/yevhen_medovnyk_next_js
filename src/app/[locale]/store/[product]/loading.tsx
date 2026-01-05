'use client';

import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loading() {
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoader(true);
		}, 0);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="spinnerWrapper">{showLoader && <ClipLoader color="#b0bab8" size={50} />}</div>
	);
}
