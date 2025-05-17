'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiCreateNew } from "../../../../../public/services/postApi";
import { DataResponse } from "../../../../../public/utils/type";
import { toast} from "react-toastify";
import {redirect} from "next/navigation";
import Toast from "../../../../../public/utils/Toast";


export default function Page() {

	const [path, setPath] = useState('')
	const [value, setValue] = useState<{
		title: string,
		dess: string,
		desshort: string,
		image: string | File,
	}>({
		title: "",
		dess: "",
		desshort: "",
		image: ""
	})

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])


	const handdleSubmit = async () => {
		if (value?.title !== "" && value?.dess !== "" && value?.desshort !== "" && value?.image !== "") {
			const image = value?.image;
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
				title: value?.title,
				dess: value?.dess,
				desshort: value?.desshort,
				image: imageUrl?.secure_url
			}
			const handdleCreate = async () => {
				const responsive = await apiCreateNew(obj) as DataResponse;
				console.log(responsive)
				if (responsive?.data?.code === 0) {
					toast.success(responsive?.data?.message);
					setTimeout(()=>{
                         redirect("/user/news/edit")
					},1000);
				}
			}
			handdleCreate();
		}
	}

	return (
		<div>
			<div className="mt-[-9px] w-full flex min-md:justify-end max-md:justify-start">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="max-md:my-4">
				<div className="my-2 flex flex-col gap-2 ">
					<Label>Tiêu đề</Label>
					<Input type="text" value={value?.title} className="border border-[#ccc]" onChange={e => setValue(prev => ({ ...prev, title: e.target.value }))} placeholder="Nhập tiêu đề của bài viết vào đây ..." />
				</div>
				<div className="my-2 flex flex-col gap-2">
					<Label>Mô tả ngắn</Label>
					<Input type="text" value={value?.desshort} className="border border-[#ccc]" onChange={e => setValue(prev => ({ ...prev, desshort: e.target.value }))} placeholder="Nhập tiêu đề của bài viết vào đây ..." />
				</div>
				<div className="my-2 flex flex-col gap-2">
					<Label>Mô tả chi tiết</Label>
					<Textarea className="h-[500px] border-[#ccc] border" value={value?.dess} onChange={e => setValue(prev => ({ ...prev, dess: e.target.value }))} placeholder="Nhập tiêu đề của bài viết vào đây ..." />
				</div>
				<div className="my-2 flex flex-col gap-2">
					<Label>Ảnh bài viết</Label>
					<Input
						className="border border-[#ccc]"
						type="file"
						onChange={e => {
							const file = e.target.files && e.target.files[0];
							if (file) {
								setValue(prev => ({ ...prev, image: file }));
							}
						}}
						placeholder="Nhập tiêu đề của bài viết vào đây ..."
					/>
				</div>
				<div className="w-full">
					<Button className="w-full hover:cursor-pointer hover:bg-[#ccc] p-2 bg-[#000] text-white" onClick={handdleSubmit}>
						Tạo bài viết
					</Button>
				</div>
			</div>
			<Toast/>
		</div>
	);
}
