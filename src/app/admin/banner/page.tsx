'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../public/Page/BreadcrumbTag";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import moment from "moment";
import "moment/locale/vi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { apiBanners, apiDeleteBanners } from "../../../../public/services/authApi";
import { DataResBanner, DataResponse, ImgApi } from "../../../../public/utils/type";
import { toast } from "react-toastify";
import Toast from "../../../../public/utils/Toast";

export default function Page() {
	const [path, setPath] = useState('')
	const [banners, setBanner] = useState<ImgApi>();

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiBanners() as DataResBanner;
			if (responsive?.data?.code === 0) {
				setBanner(responsive?.data?.banners)
			}
		}
		fetchData();
	}, []);

    const handdleDelete = (id:string) => {
		const fetchData = async() => {
             const responsive = await apiDeleteBanners(id) as DataResponse;
			 console.log(responsive)
			if(responsive?.data?.code === 0) {
				toast.success("Xoá thành công sản phẩm "+ id); 
				setTimeout(()=>{
                  location.reload();  
				},2000)
			}  
		 }
		 fetchData();
	}
	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="my-4">
				<Table>
					<TableCaption className="text-[#ccc]">Bảng banner</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">STT</TableHead>
							<TableHead className="text-center">Hình ảnh</TableHead>
							<TableHead>Ngày tạo</TableHead>
							<TableHead>Ngày cập nhật</TableHead>
							<TableHead className="text-center">Chức năng</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{banners?.map((item,index) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{index+1}</TableCell>
								<TableCell className="flex items-center justify-center">
									<Image src={item?.image} width={200} height={200} alt="logo" />
								</TableCell>
								<TableCell>{moment(item?.createdAt).fromNow()}</TableCell>
								<TableCell>{moment(item?.updatedAt).fromNow()}</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center gap-2 justify-center">
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
														<AlertDialogAction onClick={()=>handdleDelete(item?.id)} className="text-white hover:cursor-pointer bg-red-500">Xoá vĩnh viễn</AlertDialogAction>
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
