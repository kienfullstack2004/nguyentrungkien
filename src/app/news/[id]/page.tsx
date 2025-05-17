'use client'

import { use, useEffect, useState } from "react";
import Footer from "../../../../public/partials/Footer";
import Header from "../../../../public/partials/Header";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { ApiResNew, CommentType, DataApiPost, DataApiResponse, DataComments, DataResponse, UserCurrent, UserData } from "../../../../public/utils/type";
import { apiNews, apiOnePost } from "../../../../public/services/postApi";
import moment from "moment";
import { apiComments, apiCreateComment, apiUserCurrent } from "../../../../public/services/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


type DataRes = {
	code: number,
	message: string,
	news: DataApiPost
}

type DataApi = {
	data: DataRes
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

	const [detail, setDetail] = useState<DataApiPost>();
	const [userData, setUserData] = useState<UserData>();
	const [news, setNews] = useState<DataApiResponse>();
	const [comments, setComments] = useState<CommentType>();
	const [comment, setComment] = useState<string>('');


	useEffect(() => {
		const fetchData = async () => {
			const responsive2 = await apiUserCurrent() as UserCurrent;
			const responsive = await apiOnePost(id) as DataApi;
			const resposive3 = await apiNews() as ApiResNew;
			const responsive4 = await apiComments(id) as DataComments;

			setComments(responsive4?.data?.comment);
			console.log(responsive4?.data?.comment)
			setUserData(responsive2?.data?.users);
			setDetail(responsive?.data?.news);
			setNews(resposive3?.data?.news);
		}
		fetchData();
	}, []);

    console.log(comments)

	const hanndleComment = async () => {
		const responsive = await apiCreateComment({ code: id, message: comment }) as DataResponse;
		if (responsive?.data?.code === 0) {
			location.reload();
		}

	}


	return (
		<div className="flex flex-col overflow-hidden">
			<Header />
			<div className="w-[80%] my-4 m-auto">
				<div className="flex flex-col">
					<div className="flex flex-col gap-2">
						<Label className="text-[40px] max-md:text-justify">
							{detail?.title}
						</Label>
						<Label className="text-[20px] max-md:text-justify">{detail?.desshort}</Label>
						<div className="text-[16px] flex gap-2">
							<div>
								{detail?.userdetail?.username}
							</div>
							<div>{moment(detail?.createdAt).fromNow()}</div>
						</div>
					</div>
					<div className="flex my-2 gap-2 ">
						<div className="w-[80%] max-md:w-full my-3 min-md:px-4">
							<div className="my-2">
								{detail?.image && <Image className="rounded-md" src={typeof detail?.image === "string" ? detail?.image : ""} width={1000} height={500} alt="logo" />}
							</div>
							<div className="text-[20px] text-justify m-auto">
								{detail?.dess}
							</div>
							<div className="flex gap-2 items-center max-md:gap-4">
								<div className="max-md:my-3">
									{userData?.avatar && <Image className="rounded-full w-[50px] h-[50px]" src={typeof userData?.avatar === "string" ? userData?.avatar : ""} width={50} height={50} alt="logo" />}
								</div>
								<div className="w-full my-3 flex max-md:flex-col gap-2">
									<Input value={comment} onChange={e => setComment(e.target.value)} className="p-2 min-md:w-[440px] border-b-2 border-[#ccc] outline-none" placeholder="Nhập nhận xét của bạn vào đây ..." />
									<Button onClick={hanndleComment} className="bg-blue-600 text-[#fff] hover:cursor-pointer hover:bg-[#ccc] ml-4">
										Bình luận
									</Button>
								</div>
							</div>
							<ul className="flex my-4 gap-3 flex-col">
								{comments?.map((item,index)=>{
								return <li key={index} className="inline-block">
									<div className="rounded-md inline-block bg-[#dddddda9]">
										<div className="p-2 gap-3 flex">
											<div className="block max-md:w-[20%] min-md:w-[30%] rounded-full">
												<Image className="rounded-full w-[50px] h-[50px]" src={item?.userComment.avatar} width={50} height={50} alt="logo" />
											</div>
											<div className="flex max-md:w-[80%] min-md:w-[70%] max-md:pr-3 flex-col gap-2">
												<Label className="text-[18px]">{item?.userComment.username}</Label>
												<p className="text-[16px] max-md:text-justify">{item?.message}</p>
												<div className="text-end pr-5 text-[12px] text-[#9c9696]">
													{moment(item?.createdAt).fromNow()}
												</div>
											</div>
										</div>
									</div>
								</li>
							})}

							</ul>
						</div>
						<div className="w-[20%] max-md:hidden flex flex-col">
							<div className="pb-2 border-b-1 flex items-center justify-center border-blue-500">
								<Label className="text-[20px]  text-blue-500 uppercase">Tin khác</Label>
							</div>
							<ul className="my-3 flex flex-col">
								{news?.map((item, index) => {
									if (item?.id !== id)
										return <Link href={'/news/' + item?.id} key={index} className="my-2">
											<li className="flex flex-col gap-2 items-center justify-center">
												{item?.image && <Image className="rounded-md" src={item?.image} width={1000} height={1000} alt="logo" />}
												<Label className="text-justify text-[20px]">
													{item?.title}
												</Label>
											</li>
										</Link>
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
