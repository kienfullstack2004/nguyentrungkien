'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiCreateBanner } from "../../../../../public/services/authApi";
import { DataResBanner } from "../../../../../public/utils/type";
import { redirect } from "next/navigation";
import { toast} from "react-toastify";
import Toast from "../../../../../public/utils/Toast";


export default function Page() {
	const [path, setPath] = useState('')
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

	const handdleCreateBanner = async () => {

		if (image) {
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

			const img = await imgApi.json();

			const imgUrl = img.secure_url;


			const fetchData = async () => {
				const responsive = await apiCreateBanner({ image: imgUrl }) as DataResBanner;
				if (responsive?.data?.code === 0) redirect('/admin/banner')
			}
			fetchData();
		} else {
			toast.error('Vui lòng chọn một hình ảnh để tạo !');
		}

	}

	const handdleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null) {
			setImage(e.target.files[0]);
		}
	}
	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="flex flex-col gap-3">
				<Label className="text-3xl">
					Ảnh banner
				</Label>
				<Input type="file" onChange={handdleImage} className="border border-[#ccc]" />
				<Button onClick={handdleCreateBanner} className="bg-black text-white hover:bg-[#ddd] hover:cursor-pointer" type="button">
					Tạo banner
				</Button>
			</div>
			<Toast/>
		</div>
	);
}
