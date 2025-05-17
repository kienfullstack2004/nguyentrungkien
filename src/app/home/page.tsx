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
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiBanners } from "../../../public/services/authApi";
import Image from "next/image";


const { IoIosAdd, IoIosClose } = icons;

type DataType = [
	{ image: string }
]


type BannerRes = {
	code: number,
	message: string,
	banners: DataType
}

type BannerReposne = {
	data: BannerRes
}




export default function Page() {

	const [isPage, setPage] = useState(false);
	const [banners, setBanners] = useState<DataType>();


	const openPage = () => {
		setPage(true);
	}

	const handdleClose = () => {
		setPage(false);
	}

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiBanners() as BannerReposne;
			if (responsive?.data?.code === 0) setBanners(responsive?.data?.banners)
		}
		fetchData();
	}, [])

   

	return (
		<div className="">
			<div className="fixed h-[100px] z-20 left-0 right-0 top-0 bg-[#fff]">
				<Header />
			</div>
			<div className="flex clear-start mt-[100px] flex-col my-12 w-[90%] m-auto">
				<div className="">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y]}
						spaceBetween={50}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}
						className="h-[350px] z-0"
					>
						{banners?.map((item) => {
							return <SwiperSlide key={item?.image}>
								<Image src={item?.image} width={1200} className="w-full object-cover" height={350} alt="logo" />
							</SwiperSlide>

						})}
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
						<IoIosClose onClick={handdleClose} size={30} color="#000" />
					</div>
					<ul className="flex items-center gap-[35px]">

						<li className="hover:text-blue-600">
							<Link href="/courses">
								Khoá học
							</Link>
						</li>
						<li className="hover:text-blue-600">
							<Link href="/news">
								Tin tức
							</Link>
						</li>
					</ul>
				</div>}
			</div>
			<Footer />
		</div>
	);
}
