'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { apiCreateNew, apiOnePost } from "../../../../../../public/services/postApi";
import { DataResApi, DataResponse } from "../../../../../../public/utils/type";
import { toast } from "react-toastify";
import Toast from "../../../../../../public/utils/Toast";




export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

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
	});

	const handdleSubmit = async () => {

		const imageLocal = value?.image;
		const formData = new FormData();

		if (imageLocal) {
			formData.append("file", imageLocal);
		}
		formData.append('upload_preset', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
		formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

		const fetchImage = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
			method: 'post',
			body: formData
		})

		const responsive = await fetchImage.json();

		const obj = {
			title: value?.title,
			image: responsive?.secure_url,
			dess: value?.dess,
			desshort: value?.desshort
		}



		const fetchData = async () => {
			const responsive = await apiCreateNew(obj) as DataResponse;
			if (responsive?.data?.code === 0) {
				toast.success(responsive?.data?.message);
				setTimeout(() => {
					history.back();
				}, 1000)
			}
		}

		fetchData();

	}

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiOnePost(id) as DataResApi;
			if (responsive?.data?.code === 0) {

				const obj = {
					title: responsive?.data?.news?.title,
					dess: responsive?.data?.news?.dess,
					desshort: responsive?.data?.news?.desshort,
					image: responsive?.data?.news?.image
				}

				setValue(obj);

			}
		}
		fetchData();
	}, [])

	return (
		<div>

			<Label className="my-4 font-bold">Tiêu đề</Label>
			<Input onChange={e => setValue(prev => ({ ...prev, title: e.target.value }))} value={value?.title} className="w-full input outline-none my-1" placeholder="Nhập tiêu đề của bạn vào đây ..." />

			<Label className="my-5 mb-[-12px]">Mô tả ngắn</Label>
			<Input onChange={e => setValue(prev => ({ ...prev, desshort: e.target?.value }))} value={value?.desshort} className="w-full input outline-none my-4" placeholder="Nhập mô tả ngắn của bạn vào đây ..." />

			<Label className="my-2">Nội dung bài viết</Label>
			<Textarea onChange={e => setValue(prev => ({ ...prev, dess: e.target.value }))} value={value?.dess} className="resize-none input h-[500px]" spellCheck={false} placeholder="Nhập mô tả của bạn vào đây ..." />


			<Label className="my-5">Ảnh bài viết</Label>
			<Input type="file" onChange={e =>
				setValue(prev => prev ? ({ ...prev, image: e.target.files && e.target.files[0] ? e.target.files[0] : "" }) : prev)} className="w-full input outline-none my-4" />
			<div className="my-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
				<Button onClick={handdleSubmit} type="submit">Cập nhật bài viết</Button>
			</div>
			<Toast />
		</div >
	);
}
