
'use client';
import { ClipLoader } from 'react-spinners';
import s from '../../components/Store/Store.module.scss';

export default function Loading() {
	return (
		<div className={s.spinnerWrapper}>
			<ClipLoader color="#b0bab8" size={50} />
		</div>
	);
}
