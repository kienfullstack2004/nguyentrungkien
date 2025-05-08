'use client'

import Link from "next/link";
import Footer from "../../../public/partials/Footer";
import Header from "../../../public/partials/Header";
import moment from "moment";
import "moment/locale/vi";
import { useState } from "react";
import { icons } from "../../../public/utils/icons";
import Image from "next/image";

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
			<div className="w-[90%] flex gap-6 m-auto">
				<div className="max-md:w-full min-md:w-[70%]">
					<Link href={'/'} className="flex flex-col">
						<Image src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1745409070/person/zu3jarzz0q8lpw8rnhwf.jpg'} className="w-full " width={500} height={500} alt="logo" />
						<div className="my-3 font-extrabold font-mono text-justify">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quae nisi obcaecati tempora iure cupiditate, tenetur suscipit numquam veniam soluta libero delectus laborum porro quam eius labore vitae beatae tempore?
						</div>
						<div className="flex justify-end">
							<div className="text-[#ccc] text-[12px]">
								{moment('2025-04-23 12:33:53').fromNow()}
							</div>
						</div>
					</Link>
					<div className="grid min-md:grid-cols-3 max-md:grid-cols-1 gap-8">
						<Link href={'/'} className="my-3 flex flex-col">
							<Image src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1745409070/person/zu3jarzz0q8lpw8rnhwf.jpg'} width={500} height={500} alt="logo" />
							<div className="font-extrabold font-mono text-justify my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, facilis voluptas. Totam suscipit voluptatem quas iure sequi modi cupiditate facere excepturi officia iusto ullam quasi, sed officiis qui alias mollitia.</div>
							<div className="flex justify-end">
								<div className="text-[#ccc] text-[12px]">
									{moment('2025-04-23 12:33:53').fromNow()}
								</div>
							</div>
						</Link>


					</div>
				</div>
				<div className="min-md:w-[30%]  max-md:hidden  flex flex-col gap-4">
					<Link href={'/'} className="">
						<Image src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1745409070/person/zu3jarzz0q8lpw8rnhwf.jpg'} width={500} height={500} alt="logo" className="object-center" />
						<div className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati veniam aliquid, repellat saepe ex at sit unde sequi odit? Saepe tempora possimus quibusdam labore commodi rerum veniam temporibus perferendis perspiciatis.</div>
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
