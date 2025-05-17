'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import moment from "moment";
import "moment/locale/vi";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { apiCousrses, apiDeleteCousrses } from "../../../../../public/services/authApi";
import {  DataResponsiveCourses, DataTypeCourses } from "../../../../../public/utils/type";


export default function Page() {
	const [path, setPath] = useState('')
    const [courses, setCourses] = useState<DataTypeCourses>();

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

    const handdleDelete = (id:string) => {
      const fetchData = async() => {
		const responsive = await apiDeleteCousrses(id) as DataResponsiveCourses;
		if(responsive?.data?.code === 0){
			toast?.success("Xoá thành công !");
			location.reload();
 		}
	  } 
	  fetchData();
	}

	useEffect(()=>{
       const fetchData = async () => {
		  const responsive = await apiCousrses() as DataResponsiveCourses;
		  if(responsive?.data?.code === 0){
			setCourses(responsive?.data?.courses);
		  }
	   }
	   fetchData();
	},[])

	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>

			<div>
				<Table>
					<TableCaption className="text-[#ccc]">Bảng cập nhật bài viết</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">STT</TableHead>
							<TableHead className="text-center">Tiêu đề</TableHead>
							<TableHead className="text-center">Hình ảnh</TableHead>
							<TableHead className="text-center">Giá khoá học</TableHead>
							<TableHead>Ngày tạo</TableHead>
							<TableHead>Ngày cập nhật</TableHead>
							<TableHead className="text-center">Chức năng</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{courses?.map((items, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{index + 1}</TableCell>
								<TableCell className="font-medium">{items.title.slice(0, 22) + "..."}</TableCell>
								<TableCell className="font-medium">
									{items.image && <Image
										height={300}
										width={300}
										src={items.image}
										alt="logo"
										className="w-[300px] h-[300px] rounded-md"
									/>}
								</TableCell>
								<TableCell>{items?.price}</TableCell>
								<TableCell>{moment(items?.createdAt).fromNow()}</TableCell>
								<TableCell>{moment(items?.updatedAt).fromNow()}</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center gap-2 justify-center">
										<Link href={'/admin/courses/edit/' + items?.id} className="text-white px-3 py-2 rounded-md bg-blue-400 hover:cursor-pointer">Sửa</Link>
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
														<AlertDialogAction onClick={() => handdleDelete(items?.id)} className="text-white hover:cursor-pointer bg-red-500">Xoá vĩnh viễn</AlertDialogAction>
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
		</div>
	);
}
