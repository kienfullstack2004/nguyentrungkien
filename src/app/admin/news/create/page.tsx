'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { apiCreateNew } from "../../../../../public/services/postApi";
import { DataResponse } from "../../../../../public/utils/type";
import { toast } from "react-toastify";
import Toast from "../../../../../public/utils/Toast";


export default function Page() {

	const [path, setPath] = useState('')
    const [news,setNews] = useState<{title:string,
		dess:string,
		desshort:string,
		image:File|string,
	}>({
		title:"",
		image:"",
		dess:"",
		desshort:""
	})

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
		if (typeof window !== 'undefined') {
		}
	}, [])

	

	async function handdleSubmit() {
		if (news?.title !== "" && news?.dess !== "" && news?.desshort !== "" && news?.image !== "") {
					const image = news?.image;
					const formData = new FormData();
					if (image) {
						formData.append('file', image);
					}
					formData.append('upload_preset', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
					formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);
		
					const imgApi = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
						method: 'post',
						body: formData
					})
					const imageUrl = await imgApi?.json();
					const obj = {
						title: news?.title,
						dess: news?.dess,
						desshort: news?.desshort,
						image: imageUrl?.secure_url
					}
					const handdleCreate = async () => {
						const responsive = await apiCreateNew(obj) as DataResponse;
						if (responsive?.data?.code === 0) {
							toast.success(responsive?.data?.message);
							setTimeout(()=>{
								 history.back();
							},1000);
						}
					}
					handdleCreate();
				}
	}

	return (
		<div className="">
			<div className="mt-[-9px] w-full flex min-md:justify-end max-md:justify-start">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="max-md:my-4">
				<Label className="my-3">
					Tiêu đề của bài viết
				</Label>
				<Input className="w-full input outline-none my-1" value={news?.title} onChange={e=>setNews(prev=>({...prev,title:e.target.value}))} placeholder="Nhập tiêu đề của bạn vào đây ..." />
				<Label className="my-3">
					Mô tả ngắn
				</Label>
				<Input onChange={e=>setNews(prev=>({...prev,desshort:e.target.value}))} value={news?.desshort} className="w-full input outline-none my-4" placeholder="Nhập mô tả ngắn của bạn vào đây ..." />
				<Label className="my-3">Nội dung bài viết</Label>
				<Textarea className="resize-none input h-[500px]" value={news?.dess} onChange={e=>setNews(prev=>({...prev,dess:e.target.value}))} spellCheck={false} placeholder="Nhập mô tả của bạn vào đây ..." />
				<Label className="my-3">Ảnh bài viết</Label>
				<Input type="file"
				  onChange={e=>{
					setNews(prev => ({
						...prev,
						image: e.target.files && e.target.files[0] ? e.target.files[0] : ""
					}))
				  }}
				className="w-full input outline-none my-4" />
				<div className="mt-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
					<Button onClick={handdleSubmit}>Thêm mới bài viết</Button>
				</div>
			</div >
			<Toast/>
		</div >
	);
}
