'use client'

import Footer from "../../../public/partials/Footer";
import Header from "../../../public/partials/Header";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PostPopular from "../../../public/Page/PostPopular";
import { icons } from "../../../public/utils/icons";
import { useState } from "react";

const { IoIosAdd,IoIosClose } = icons;

export default function Page() {

	const [isPage, setPage] = useState(false);

	const openPage = () => {
		setPage(true);
	}

	const handdleClose = () => {
		setPage(false);
	}

	return (
		<div className="">
			<Header />
			<div className=" flex flex-col my-12 w-[90%] m-auto">
				<div className="overflow-hidden">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y]}
						spaceBetween={50}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}
						className="h-[250px]"
					>
						<SwiperSlide>Slide 1</SwiperSlide>
						<SwiperSlide>Slide 2</SwiperSlide>
						<SwiperSlide>Slide 3</SwiperSlide>
						<SwiperSlide>Slide 4</SwiperSlide>
					</Swiper>
				</div>
				<div className="my-12">
					<PostPopular />
				</div>
				<div className="fixed bottom-2 z-10 flex justify-center bg-white shadow-2xl items-center right-2 w-[40px] h-[40px] rounded-md">
					<IoIosAdd onClick={openPage} size={30} color="#000" />
				</div>
				{isPage && <div data-aos="fade-up"
					data-aos-duration="1000" className="fixed bottom-0 h-[100px] z-20 bg-white left-0 right-0 flex items-center justify-center shadow-2xl">
					 <div className="absolute right-3 top-3">
					   <IoIosClose onClick={handdleClose} size={30} color="#000"/>	
					</div> 
					<ul className="flex items-center gap-[35px]">
					 
						<li className="hover:text-blue-600">
							<a href="/courses">
								Khoá học
							</a>
						</li>
						<li className="hover:text-blue-600">
							<a href="/news">
								Tin tức
							</a>
						</li>
					</ul>
				</div>}
			</div>
			<Footer />
		</div>
	);
}
