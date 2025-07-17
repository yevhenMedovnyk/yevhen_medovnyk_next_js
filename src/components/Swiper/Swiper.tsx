import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { FreeMode, Navigation, Pagination, Thumbs, Keyboard } from 'swiper/modules';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import s from './Swiper.module.scss';

//import Prev_arrow from 'src/assets/arrow-left.svg?react';
//import Next_arrow from 'src/assets/arrow-right.svg?react';
import { IImage } from '../../types/IImage';

interface ImageSliderProps {
	className?: string;
	slidesPerView: number;
	spaceBetween: number;
	slidesPerGroup: number;
	loop?: boolean;
	centeredSlides?: boolean;
	centeredSlidesBounds?: boolean;
	pagination?: { clickable: boolean };
	slideStyle?: React.CSSProperties;
	//children: React.ReactNode[];
	images: IImage[];
	onSlideChange?: () => void;
}

const Slider: React.FC<ImageSliderProps> = ({
	className,
	slidesPerView,
	spaceBetween,
	slidesPerGroup,
	centeredSlides = true,
	centeredSlidesBounds = true,
	//pagination = true,
	loop,
	//children,
	images,
	slideStyle,
	onSlideChange,
}) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

	return (
		<div className={clsx(s.wrapper, className && s[className])}>
			<Swiper
				//navigation={{
				//	prevEl: '.prevBtn',
				//	nextEl: '.nextBtn',
				//}}
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				centeredSlides={centeredSlides}
				centeredSlidesBounds={centeredSlidesBounds}
				slidesPerGroup={slidesPerGroup}
				modules={[Navigation, Pagination, Thumbs, Keyboard]}
				//pagination={pagination}
				grabCursor
				speed={600}
				style={{ width: '100%', height: '100%' }}
				onSlideChange={onSlideChange}
				loop={loop}
				autoHeight={true}
				keyboard={{ enabled: true }}
				thumbs={{ swiper: thumbsSwiper }}
				observer={true} // Перевірка змін у Swiper
				observeParents={true} // Спостереження за батьківським елементом
			>
				{images.map((item, index) => (
					<SwiperSlide key={index} style={slideStyle}>
						<img src={item.img} alt={item.name} />
					</SwiperSlide>
				))}

				{/*<button style={{ cursor: 'pointer' }} className={'prevBtn'}>
					<Prev_arrow className={s.leftArrow} />
				</button>
				<button style={{ cursor: 'pointer' }} className={'nextBtn'}>
					<Next_arrow className={s.rightArrow} />
				</button>*/}
			</Swiper>
			<Swiper
				onSwiper={(swiper) => setThumbsSwiper(swiper)}
				spaceBetween={7}
				slidesPerView={5}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[Navigation, Thumbs, FreeMode]}
				className="mySwiperThumbs"
			>
				{images.map((item, index) => (
					<SwiperSlide key={index}>
						<img src={item.img} alt={item.name} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Slider;
