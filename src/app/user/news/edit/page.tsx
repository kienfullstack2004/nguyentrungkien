'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import moment from "moment";
import "moment/locale/vi";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { apiDeletePost, apiNews } from "../../../../../public/services/postApi";
import { ApiRes, DataResponse, DataType } from "../../../../../public/utils/type";
import { toast, ToastContainer } from "react-toastify";




export default function Page() {

	const [path, setPath] = useState('')
	const [news, setNews] = useState<DataType>();

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiNews() as ApiRes;
			if (responsive?.data?.code === 0) {
				setNews(responsive?.data?.news);
			}
		}
		fetchData();
	}, [])


	const handdleDelete = (id: string) => {
		const fetchDelete = async () => {
			const responsive = await apiDeletePost(id) as DataResponse;
			if (responsive?.data?.code === 0) {
				toast.success("Xoá thành công!");
				setTimeout(() => {
					location?.reload();
				}, 1000)
			}
		}
		fetchDelete();
	}

	return (
		<div>
			<div className="mt-[-9px] w-full flex max-md:justify-start min-md:justify-end">
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
						{news?.map((invoice, index) => (
							<TableRow key={invoice?.id}>
								<TableCell className="font-medium">{index + 1}</TableCell>
								<TableCell>{invoice?.desshort.slice(0, 25) + "..."}</TableCell>
								<TableCell className="flex items-center justify-center">
									<Image src={invoice?.image} width={200} height={200} alt="logo" />
								</TableCell>
								<TableCell>{moment(invoice?.createdAt).fromNow()}</TableCell>
								<TableCell>{moment(invoice?.updatedAt).fromNow()}</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center gap-2 justify-center">
										<Link href={'/user/news/edit/' + invoice?.id} className="text-white px-3 py-2 rounded-md bg-blue-400 hover:cursor-pointer">Sửa</Link>
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
														<AlertDialogAction onClick={() => handdleDelete(invoice?.id)} className="text-white hover:cursor-pointer bg-red-500">Xoá vĩnh viễn</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* <TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className="text-right">$2,500.00</TableCell>
						</TableRow>
					</TableFooter> */}
				</Table>
			</div>
			<ToastContainer />
		</div>
	);
}
