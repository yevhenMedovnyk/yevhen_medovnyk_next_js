'use client';
import { ClipLoader } from 'react-spinners';

export default function Loading() {
	return (
		<div className="spinnerWrapper">
			<ClipLoader color="#b0bab8" size={50} />
		</div>
	);
}
