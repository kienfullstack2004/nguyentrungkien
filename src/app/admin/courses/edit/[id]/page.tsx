'use client'

import { use, useEffect, useState } from "react";
import { apiCreateCousrses, apiGetOneCousrses } from "../../../../../../public/services/authApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Toast from "../../../../../../public/utils/Toast";
import { toast } from "react-toastify";
import { DataResponsive } from "../../../../../../public/utils/type";


type DataType = {
	id: string,
	title: string,
	desshort: string,
	time: string,
	image: string | File,
	dess: string,
	price: string,
	price_sale: string,
}

type DataApi = {
	code: number,
	message: string,
	courses: DataType
}

type DataResponse = {
	data: DataApi
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

	const [courses, setCourses] = useState<DataType>();

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiGetOneCousrses(id) as DataResponse;
			if (responsive?.data?.code === 0) {
				setCourses(responsive?.data?.courses);
			}
		}

		fetchData();
	}, [])

	const handdleSubmit = async () => {
		const imageLocal = courses?.image;

		const formData = new FormData();

		if (imageLocal) {
			formData.append('file', imageLocal);
		}
		formData.append('upload_preset', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
		formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

		const imgApi = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
			method: 'post',
			body: formData
		})
		const imageUrl = await imgApi?.json();

		const obj = {
			title: courses?.title ?? "",
			dess: courses?.dess ?? "",
			desshort: courses?.desshort ?? "",
			price: courses?.price ?? "",
			price_sale: courses?.price_sale ?? "",
			image: imageUrl?.secure_url ?? "",
			time: courses?.time ?? "",
		}

		console.log(obj)

		const fetchData = async () => {
			const responsive = await apiCreateCousrses(obj) as DataResponsive;
			if (responsive?.data?.code === 0) {
				toast.success(responsive?.data?.message)
				setTimeout(() => {
					history.back();
				}, 1000)
			}
		}
		fetchData();
	}

	return (
		<div>
			<div>
				<Label className="my-4 font-bold">Tiêu đề</Label>
				{courses?.title && <Input
					onChange={e =>
						setCourses(prev =>
							prev
								? { ...prev, title: e.target.value }
								: prev
						)
					}
					value={courses?.title}
					className="w-full input outline-none my-1"
					placeholder="Nhập tiêu đề của bạn vào đây ..."
				/>
				}
				<Label className="my-5 mb-[-12px]">Mô tả ngắn</Label>
				{courses?.desshort && <Input onChange={e => setCourses(prev => prev ? ({ ...prev, desshort: e.target?.value }) : prev)} value={courses?.desshort} className="w-full input outline-none my-4" placeholder="Nhập mô tả ngắn của bạn vào đây ..." />}

				<Label className="my-2">Nội dung bài viết</Label>
				{courses?.dess && <Textarea onChange={e => setCourses(prev => prev ? ({ ...prev, dess: e.target.value }) : prev)} value={courses?.dess} className="resize-none input h-[500px]" spellCheck={false} placeholder="Nhập mô tả của bạn vào đây ..." />}

				<Label className="my-2">Giá khoá học</Label>
				{courses?.price && <Input value={courses?.price} onChange={e => setCourses(prev => prev ? ({ ...prev, price: e.target.value }) : prev)} placeholder="Nhập vào giá khoá học ..." />}

				<Label className="my-2">Giảm giá</Label>
				<select name="sale" className="max-md:w-[300px]" value={courses?.price_sale} onChange={e => setCourses(prev => prev ? ({ ...prev, price_sale: e.target.value }) : prev)}>
					<option value={'0.1'} >
						10%
					</option>
					<option value={'0.2'} >
						20%
					</option>
					<option value={'0.3'} >
						30%
					</option>
					<option value={'0.4'} >
						40%
					</option>
					<option value={'0.5'} >
						50%
					</option>
				</select>

				<Label className="my-5">Ảnh bài viết</Label>
				<Input type="file" onChange={e =>
					setCourses(prev =>
						prev && e.target.files && e.target.files[0]
							? { ...prev, image: e.target.files[0] }
							: prev
					)} className="w-full input outline-none my-4" />
				<Label className="my-5">Thời gian</Label>
				<Input onChange={e =>
					setCourses(prev => prev ? ({ ...prev, time: e.target.value }) : prev)} className="w-full input outline-none my-4" />
				<div className="my-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
					<Button onClick={handdleSubmit} type="submit">Cập nhật bài viết</Button>
				</div>
				<Toast />
			</div>
		</div>
	);
}
