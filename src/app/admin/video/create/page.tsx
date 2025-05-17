'use client'
import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { ApiYoutubeCreate } from "../../../../../public/utils/type";
import { apiCreateYoutube } from "../../../../../public/services/userApi";


export default function Page() {
	const [path, setPath] = useState('')
	const [valueYtb, setValueYtb] = useState<{
		code: string,
		type: string,
		log: string
	}>({
		code: "",
		type: "",
		log: "entaiment"
	});


	const handdleSubmit = () => {
		const rerget = valueYtb?.code?.split("?v=")[1];
		// console.log(rerget);
		const fetchData = async () => {
			const responsive = await apiCreateYoutube({ code: rerget, type: valueYtb.type, log: valueYtb.log }) as ApiYoutubeCreate;
			if (responsive?.data?.code === 0) {
				history.back();
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

			<div className="mt-[100px] w-[80%] m-auto">
				<div>
					<Label className="font-bold text-2xl my-2">
						Mã code youtube <span className="text-red-600 ">(*)</span>
					</Label>
					<Input value={valueYtb.code} onChange={e => setValueYtb(prev => ({ ...prev, code: e.target.value }))} placeholder="Nhập mã code youtube của bạn vào đây ..." />
					<Label className="font-bold text-2xl my-2">
						Thể loại video yêu thích
					</Label>
					<div className="my-2 flex gap-2">
						<select name="type" value={valueYtb.type} onChange={e=>setValueYtb(prev=>({...prev,type:e.target.value}))} className="min-md:min-w-[500px] max-md:w-full">
							<option defaultChecked>
								Ca nhạc
							</option>
							<option>
								Phim
							</option>
						</select>
						<Button onClick={handdleSubmit} className="text-white bg-black rounded-md hover:bg-[#ccc] hover:cursor-pointer">
							Cập nhật
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
