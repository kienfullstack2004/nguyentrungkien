'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiUserCurrent } from "../../../../../public/services/userApi";
import { DataResponsive, UserCurrent, UserData } from "../../../../../public/utils/type";
import { apiCreateCousrses } from "../../../../../public/services/authApi";
import { toast } from "react-toastify";



export default function Page() {
	const [path, setPath] = useState('')
	const [courses, setCourses] = useState<{ title: string, desshort: string, image: string | File, dess: string, price: string, price_sale: string, author: string, time: string }>({
		time: "",
		dess: "",
		price: "",
		price_sale: "",
		author: "",
		title: "",
		image: "",
		desshort: ""
	});

	const [userData, setUserData] = useState<UserData>();

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiUserCurrent() as UserCurrent;
			if (responsive?.data?.code === 0) {
				setUserData(responsive?.data?.users);
			}
		}
		fetchData();
	}, [])


	const handdleAdd = async () => {
		const imageLocal = courses?.image;

		const formData = new FormData();
		formData.append("file", imageLocal);
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
			title: courses?.title,
			dess: courses?.dess,
			desshort: courses.desshort,
			price: courses?.price,
			price_sale: courses?.price_sale,
			image: imageUrl?.secure_url,
			time: courses?.time,
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

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])
	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>

			<div className="my-3">
				<Label className="my-2">
					Tên khoá học
				</Label>
				<Input value={courses?.title} onChange={e => setCourses(prev => ({ ...prev, title: e.target.value }))} placeholder="Nhập vào tên khoá học ..." />
				<Label className="my-2">
					Tên mô tả
				</Label>
				<Input value={courses?.dess} onChange={e => setCourses(prev => ({ ...prev, dess: e.target.value }))} placeholder="Nhập vào mô tả khoá học ..." />
				<Label className="my-2">
					Mô tả chi tiết
				</Label>
				<Input value={courses?.desshort} onChange={e => setCourses(prev => ({ ...prev, desshort: e.target.value }))} placeholder="Nhập vào mô tả chi tiết khoá học ..." />
				<Label className="my-2">
					Giá khoá học
				</Label>
				<Input value={courses?.price} onChange={e => setCourses(prev => ({ ...prev, price: e.target.value }))} placeholder="Nhập vào giá khoá học ..." />
				<Label className="my-2">
					Giảm giá
				</Label>
				<select name="sale" className="max-md:w-[300px]" value={courses.price_sale} onChange={e => setCourses(prev => ({ ...prev, price_sale: e.target.value }))}>
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
				<Label className="my-3">
					Tác giả
				</Label>
				{userData?.username && <Input value={userData?.username} readOnly className="bg-[#ccc] hover:cursor-not-allowed" />}
				<Label className="my-2">
					Thời gian
				</Label>
				<Input value={courses?.time} onChange={e => setCourses(prev => ({ ...prev, time: e.target.value }))} />
				<Label className="my-3">
					Ảnh bài viết
				</Label>
				<Input type="file" onChange={e => {
					const files = e.target.files;
					if (files && files[0]) {
						setCourses(prev => ({ ...prev, image: files[0] }));
					}
				}} />
				<Button onClick={handdleAdd} className="bg-[#000] w-full my-3 text-white">
					Tạo khoá học
				</Button>
			</div>
		</div>
	);
}
