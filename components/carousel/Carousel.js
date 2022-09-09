/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import style from "./carousel.module.css";
import Link from "next/dist/client/link";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Carousel(props) {

	const [data, setData] = useState(null);
	const [image, setImage] = useState(null);
	const [theSlides, setTheSlides] = useState(null);
	const imageList = [];
    
	useEffect(() => {
		setData(props.data);
	}, [props.data]);
    
	useEffect(() => {
		if (data) {
			for (let i = 0; i < data.length; i++) {
				imageList.push(data[i].thumbnail);
			}
			setImage(imageList);
		}
	}, [data]);

	useEffect(() => {
		if (image) {
			const slides = [];
			for(let i = 0; i < image.length; i++) {
				slides.push(
					<SwiperSlide tag='li' key={i}>
						<Link href={"/game-details/" + data[i].id}>
							<div className={style.carouselImageHolder}>
								<div className={style.carouselOverlay}>
									<div style={{height: "70%"}}/>
									<div className={style.titleHolder}>
										<p>{data[i].title}</p>
									</div>
								</div>
								<img src={image[i]} className={style.carouselImage} alt="Product Image" />
							</div>
						</Link>
					</SwiperSlide>
				);
			}
			setTheSlides(slides);
		}
	}, [image]);
    
	return (
		<div className={style.carousel}>
			<Swiper 
				id='main' 
				tag='section' 
				wrapperTag='ul' 
				autoplay={{delay: 1700}}
				loop={true}
				slidesPerView={1.8}
				centeredSlides={true}
				initialSlide={2}
                
				className='main-carousel'
			>
				{imageList && theSlides}      
			</Swiper>
		</div>
	);
}

export default Carousel;