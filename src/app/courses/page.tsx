'use client'

import Link from "next/link";
import Footer from "../../../public/partials/Footer";
import Header from "../../../public/partials/Header";
import { useEffect, useState } from "react";
import { icons } from "../../../public/utils/icons";
import Image from "next/image";
import { apiCousrses } from "../../../public/services/authApi";
import { DataResponsiveCourses, DataTypeCourses } from "../../../public/utils/type";

const { IoIosAdd, IoIosClose } = icons;



export default function Page() {

	const [isPage, setPage] = useState(false);
	const [courses, setCousres] = useState<DataTypeCourses>();

	const openPage = () => {
		setPage(true);
	}

	const handdleClose = () => {
		setPage(false);
	}

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiCousrses() as DataResponsiveCourses;
			if (responsive?.data?.code === 0) {
				setCousres(responsive?.data?.courses)
			}
		}
		fetchData();
	}, [])

	return (
		<div>
			<Header />
			<div className="w-[90%] m-auto">
				<div className="grid min-md:grid-cols-4 max-md:grid-cols-1 gap-2">
					{courses?.map((item, index) => {
						return <div key={index}>
							<Link href={'/courses/' + item?.id}>
								<div className="flex flex-col">
									{item?.image && <Image src={item?.image} height={500} width={500} alt="logo" />}
									<div className="font-bold font-mono my-3 text-[16px] flex items-center gap-2"><span>{+item?.price * +item?.price_sale}</span> <span className="line-through text-[12px] text-red-500">{item?.price}</span></div>
									<div className="font-bold font-mono">{item?.title}</div>
								</div>
							</Link>
						</div>

					})}




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
