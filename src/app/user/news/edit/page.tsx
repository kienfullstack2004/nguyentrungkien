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

export default function Page() {

	const [path, setPath] = useState('')

	useEffect(() => {
		setPath(location.href?.split('https://nguyentrungkien.vercel.app/')[1]);
	}, [])

	const invoices = [
		{
			invoice: "1",
			paymentStatus: "Paid",
			totalAmount: "$250.00",
			paymentMethod: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea nemo ducimus modi non commodi cum, voluptas rem labore harum quod doloremque quo deleniti? Libero inventore vel autem est expedita rem?",
		}
	]

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
						{invoices?.map((invoice) => (
							<TableRow key={invoice.invoice}>
								<TableCell className="font-medium">{invoice.invoice}</TableCell>
								<TableCell>{invoice.paymentMethod.slice(0, 25) + "..."}</TableCell>
								<TableCell className="flex items-center justify-center">
									<Image src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1745409070/person/zu3jarzz0q8lpw8rnhwf.jpg'} width={200} height={200} alt="logo" />
								</TableCell>
								<TableCell>{moment('2025-04-23 11:51:10').fromNow()}</TableCell>
								<TableCell>{moment('2025-04-23 11:51:10').fromNow()}</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center gap-2 justify-center">
										<Link href={'/user/news/edit/' + invoice?.invoice} className="text-white px-3 py-2 rounded-md bg-blue-400 hover:cursor-pointer">Sửa</Link>
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
														<AlertDialogAction className="text-white hover:cursor-pointer bg-red-500">Xoá vĩnh viễn</AlertDialogAction>
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
		</div>
	);
}
