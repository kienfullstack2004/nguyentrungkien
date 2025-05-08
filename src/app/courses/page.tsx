'use client'

import Link from "next/link";
import Footer from "../../../public/partials/Footer";
import Header from "../../../public/partials/Header";
import { useState } from "react";
import { icons } from "../../../public/utils/icons";

const { IoIosAdd, IoIosClose } = icons;

export default function Page() {

	const [isPage, setPage] = useState(false);

	const openPage = () => {
		setPage(true);
	}

	const handdleClose = () => {
		setPage(false);
	}

	return (
		<div>
			<Header />
			<div className="w-[90%] m-auto">
				<div className="grid min-md:grid-cols-4 max-md:grid-cols-1 gap-2">

					<Link href={'/'}>
						<div className="flex flex-col">
							<img src={'https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg'} alt="logo" />
							<div className="font-bold font-mono my-3 text-[16px] flex items-center gap-2"><span>1.200.000</span> <span className="line-through text-[12px] text-red-500">1.500.000</span></div>
							<div className="font-bold font-mono">Khoá học Fullstack</div>
						</div>
					</Link>


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
