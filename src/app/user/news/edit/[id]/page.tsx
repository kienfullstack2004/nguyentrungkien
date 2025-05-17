'use client'
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiCreateNew, apiOnePost } from "../../../../../../public/services/postApi";
import { Label } from "@/components/ui/label";
import { DataResponse } from "../../../../../../public/utils/type";
import { toast, ToastContainer } from "react-toastify";

type DataType = {
	title: string,
	dess: string,
	desshort: string,
	image: string,
}

type DataMess = {
	code: number,
	message: string,
	news: DataType
}

type ApiRes = {
	data: DataMess
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [news, setNews] = useState<DataType>();
	const [image, setImage] = useState<File>();

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiOnePost(id) as ApiRes;
			if (responsive?.data?.code === 0) {
				setNews(responsive?.data?.news);
			}
		}
		fetchData();
	}, [])


	async function onSubmit() {


		const imageLocal = image;
		const formData = new FormData();
        

		if(imageLocal){
			formData.append("file",imageLocal);
		}
		formData.append('upload_preset', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
			formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

			const fetchImage = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
				method: 'post',
				body: formData
			})
   
		const responsive = await fetchImage.json();

		const obj = {
			title: news?.title ?? "",
			dess: news?.dess ?? "",
			desshort: news?.desshort ?? "",
			image: responsive?.secure_url ?? ""
		}

		const fetchData = async() => {

           const responsive = await apiCreateNew(obj) as DataResponse;
		   console.log(responsive?.data?.message)
		   if(responsive?.data?.code === 0) {
             toast.success("Đăng bài viết thành công !");
			 setTimeout(()=>{
                history.back();
			 },1000)     
		   }
		}

		fetchData();
	}


	return (
		<div className="">
				<div>
					<div>
						<Label className="text-2xl my-2 font-bold">
							Tiêu đề của bài viết
						</Label>
						<Input
							value={news?.title ?? ""}
							onChange={e =>
								setNews(prev =>
									prev
										? { ...prev, title: e.target.value }
										: { title: e.target.value, dess: "", desshort: "", image: "" }
								)
							}
							className="w-full input outline-none my-1"
							placeholder="Nhập title của bạn vào đây ..."
						/>

					</div>
					<div>
						<Label className="text-2xl my-2 font-bold">
							Mô tả ngắn
						</Label>
						<Input value={news?.desshort ?? ""}
							onChange={e =>
								setNews(prev =>
									prev
										? { ...prev, desshort: e.target.value }
										: { title: "", dess: e.target.value, desshort: "", image: "" }
								)
							} spellCheck={true} className="w-full input outline-none my-4" placeholder="Nhập mô tả ngắn của bạn vào đây ..." />

					</div>

					<div>
						<Label className="text-2xl my-2 font-bold">
							Nội dung chi tiết
						</Label>
						<Textarea value={news?.dess ?? ""}
							onChange={e =>
								setNews(prev =>
									prev
										? { ...prev, dess: e.target.value }
										: { title: "", dess: "", desshort: e.target.value, image: "" }
								)
							} className="resize-none input h-[500px]" spellCheck={false} placeholder="Nhập mô tả của bạn vào đây ..." />

					</div>

					<div className="flex flex-col gap-2">
						<Label className="my-3">Ảnh bài viết</Label>
						<Input type="file" onChange={e => {
							if (e.target.files && e.target.files.length > 0) {
								setImage(e.target.files[0]);
							}
						}} />
					</div>

					<div className="mt-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
						<Button onClick={onSubmit}>Cập nhật bài viết</Button>
					</div>
				</div>
			<ToastContainer/> 
		</div>
	);
}
