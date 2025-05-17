'use client';
import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import moment from "moment";
import "moment/locale/vi";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { apiDeletePost, apiNews } from "../../../../../public/services/postApi";
import { DataApi, DataResponse, DataResponsive } from "../../../../../public/utils/type";
import Toast from "../../../../../public/utils/Toast";
import { toast } from "react-toastify";



export default function Page() {

	const [path, setPath] = useState('')
    const [news,setNews] = useState<DataApi>();

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiNews() as DataResponsive;
			console.log(responsive)
			if (responsive?.data?.code === 0) {
                setNews(responsive?.data?.news);
			}
		}
		fetchData();
	}, []);


	const handdleDelete = (id:string) => {
        const data = async() => {
            const responsive = await apiDeletePost(id) as DataResponse;
			if(responsive?.data?.code === 0){
			    toast.success("Xoá thành công !");
				location.reload();
			} 
		}
		data();
	}


	return (
		<div>
			<div className="mt-[-9px] w-full flex min-md:justify-end max-md:justify-start">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="my-4">
				<Table>
					<TableCaption className="text-[#ccc]">Bảng cập nhật bài viết</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">STT</TableHead>
							<TableHead className="text-center">Tiêu đề</TableHead>
							<TableHead className="text-center">Hình ảnh</TableHead>
							<TableHead>Ngày tạo</TableHead>
							<TableHead>Ngày cập nhật</TableHead>
							<TableHead className="text-center">Chức năng</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{news?.map((items,index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{index + 1}</TableCell>
								<TableCell className="font-medium">{items.title.slice(0,22) + "..."}</TableCell>
								<TableCell className="font-medium">
									{items.image &&<Image
										height={300}
										width={300}
										src={typeof items.image === "string" ? items.image : ""}
										alt="logo"
										className="w-[300px] h-[300px] rounded-md"
									/>}
								</TableCell>
								<TableCell>{moment(items?.createdAt).fromNow()}</TableCell>
								<TableCell>{moment(items?.updatedAt).fromNow()}</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center gap-2 justify-center">
										<Link href={'/admin/news/edit/' + items?.id} className="text-white px-3 py-2 rounded-md bg-blue-400 hover:cursor-pointer">Sửa</Link>
										<div>
											<AlertDialog >
												<AlertDialogTrigger asChild>
													<Button className="bg-red-500 text-white hover:cursor-pointer">Xoá</Button>
												</AlertDialogTrigger>
												<AlertDialogContent className="border border-[#ccc] bg-white text-black">
													<AlertDialogHeader>
														<AlertDialogTitle>Bạn có chắc chắn tuyệt đối không?</AlertDialogTitle>
														<AlertDialogDescription>
															Tôi chắc chắn muốn xoá bài này
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel className="border border-[#ccc] hover:cursor-pointer">Huỷ</AlertDialogCancel>
														<AlertDialogAction onClick={()=>handdleDelete(items?.id)} className="text-white hover:cursor-pointer bg-red-500">Xoá vĩnh viễn</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Toast/>
		</div>
	);
}
