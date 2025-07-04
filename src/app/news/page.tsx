'use client'

import Link from "next/link";
import Footer from "../../../public/partials/Footer";
import Header from "../../../public/partials/Header";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { icons } from "../../../public/utils/icons";
import Image from "next/image";
import { apiNews } from "../../../public/services/postApi";
import { DataApiPost, DataApiResponse, DataResponsiveNew } from "../../../public/utils/type";

const { IoIosAdd, IoIosClose } = icons;

export default function Page() {

	const [isPage, setPage] = useState(false);
	const [news, setNews] = useState<DataApiPost>();
	const [posts, setPosts] = useState<DataApiResponse>();

	const openPage = () => {
		setPage(true);
	}

	const handdleClose = () => {
		setPage(false);
	}

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiNews() as DataResponsiveNew;

			responsive?.data?.news?.forEach((items, index) => {
				if (index === 0) {
					setNews(items);
				}
			})

			if (responsive?.data?.code === 0) {
				setPosts(responsive?.data?.news);
			}



		}

		fetchData();
	}, [])


	return (
		<div>
			<Header />
			<div className="w-[90%] flex gap-6 m-auto">
				<div className="max-md:w-full min-md:w-[70%]">
					<Link href={'/news/' + news?.id} className="flex flex-col">
						{news?.image && <Image src={news?.image} className="w-full" width={500} height={500} alt="logo" />}
						<div className="my-3 font-extrabold font-mono text-justify">
							{news?.title}
						</div>
						<div className="flex justify-end">
							<div className="text-[#ccc] text-[12px]">
								{moment(news?.createdAt).fromNow()}
							</div>
						</div>
					</Link>
					<div className="grid min-md:grid-cols-3 max-md:grid-cols-1 gap-8">
						{posts?.map((item, index) => {
							return <div key={index} className="">
								<Link href={'/news/' + news?.id} className="flex flex-col">
									{news?.image && <Image src={news?.image} className="w-full" width={300} height={300} alt="logo" />}
									<div className="my-3 font-extrabold font-mono text-justify">
										{news?.title}
									</div>
									<div className="flex justify-end">
										<div className="text-[#ccc] text-[12px]">
											{moment(news?.createdAt).fromNow()}
										</div>
									</div>
								</Link>
							</div>
						})}
					</div>
				</div>
				<div className="min-md:w-[30%]  max-md:hidden  flex flex-col gap-4">
					{posts?.map((item, index) => {
						if (index !== 0)
							return <Link href={'/news/' + item?.id} key={index} className="">
								{item?.image && <Image src={item?.image} width={500} height={500} alt="logo" className="object-center" />}
								<div className="text-justify">{item?.title}</div>
							</Link>
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
