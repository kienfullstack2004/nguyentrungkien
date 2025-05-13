'use client'

import { use } from "react";
import Footer from "../../../../public/partials/Footer";
import Header from "../../../../public/partials/Header";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

	console.log(id)

	return (
		<div className="flex flex-col overflow-hidden">
			<Header />
			<div className="w-[80%] my-4 m-auto">
				<div className="flex flex-col">
					<div className="flex flex-col gap-2">
						<Label className="text-[40px] max-md:text-justify">
							Chính phủ chính thức thông qua Đề án sắp xếp đơn vị hành chính cấp tỉnh năm 2025
						</Label>
						<Label className="text-[20px] max-md:text-justify">Chính phủ đã ban hành Nghị quyết số 125/NQ-CP ngày 9/5/2025 thông qua Đề án sắp xếp đơn vị hành chính cấp tỉnh năm 2025 do Bộ Nội vụ trình, hoàn thành việc sắp xếp 23 đơn vị hành chính cấp tỉnh mới.</Label>
						<div className="text-[16px] flex gap-2">
							<div>Nguyễn Trung Kiên</div>
							<div>11/5/2025 06:25</div>
						</div>
					</div>
					<div className="flex gap-2 ">
						<div className="w-[80%] max-md:w-full my-3 min-md:px-4">
							<div className="my-2">
								<Image className="rounded-md" src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1746937396/nguyentrungkien/lgrqgukoewygcicof6nd.png'} width={1000} height={500} alt="logo" />
							</div>
							<div className="w-[90%] text-[20px] text-justify m-auto">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis explicabo provident porro consequatur distinctio, nulla maxime rem tempore ullam deserunt non iure voluptatem neque sit rerum magni, unde architecto ab?
							</div>
							<div className="flex items-center gap-2">
								<div className="max-md:my-3">
									<Image className="rounded-full" src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1746938618/nguyentrungkien/dkgoxm6nehliknto7il2.jpg'} width={50} height={50} alt="logo" />
								</div>
								<div className="w-full">
									<input className="p-2 min-md:w-[440px] max-md:w-full border-b-2 border-[#ccc] outline-none" placeholder="Nhập nhận xét của bạn vào đây ..." />
								</div>
							</div>
							<ul className="flex my-4 gap-3 flex-col">
								<li className="inline-block">
									<div className="rounded-md inline-block bg-[#dddddda9]">
										<div className="p-2 gap-2 flex">
											<div className="block max-md:w-[20%] min-md:w-[5%] rounded-full">
												<Image className="rounded-full " src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1746938618/nguyentrungkien/dkgoxm6nehliknto7il2.jpg'} width={50} height={50} alt="logo" />
											</div>
											<div className="flex max-md:w-[80%] min-md:w-[95%] max-md:pr-3 flex-col gap-2">
												<Label className="text-[18px]">Nguyễn Trung Kiên</Label>
												<p className="text-[16px] max-md:text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam in beatae, deserunt soluta </p>
												<div className="text-end pr-5 text-[12px] text-[#9c9696]">
													12 ngày trước
												</div>
											</div>
										</div>
									</div>
								</li>
								<li className="inline-block">
									<div className="rounded-md inline-block bg-[#dddddda9]">
										<div className="p-2 gap-2 flex">
											<div className="block max-md:w-[20%] min-md:w-[5%] rounded-full">
												<Image className="rounded-full " src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1746938618/nguyentrungkien/dkgoxm6nehliknto7il2.jpg'} width={50} height={50} alt="logo" />
											</div>
											<div className="flex max-md:w-[80%] min-md:w-[95%] max-md:pr-3 flex-col gap-2">
												<Label className="text-[18px]">Nguyễn Trung Kiên</Label>
												<p className="text-[16px] max-md:text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam esse provident voluptas. Nesciunt, eos. Provident exercitationem alias eum laborum voluptatem culpa aliquam consequatur, quidem nemo ea enim iure! Earum, ratione.</p>
												<div className="text-end pr-5 text-[12px] text-[#9c9696]">
													12 ngày trước
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div className="w-[20%] max-md:hidden flex flex-col">
							<div className="pb-2 border-b-1 flex items-center justify-center border-blue-500">
								<Label className="text-[20px]  text-blue-500 uppercase">Tin khác</Label>
							</div>
							<ul className="my-3 flex flex-col">
								<Link href={'/'} className="my-2">
									<li className="flex flex-col gap-2 items-center justify-center">
										<Image className="rounded-md" src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1746936590/nguyentrungkien/ofx9cg5kyfhw93iea8ep.jpg'} width={1000} height={1000} alt="logo" />
										<Label className="text-justify text-[20px]">
											Chính phủ chính thức thông qua Đề án sắp xếp đơn vị hành chính cấp tỉnh năm 2025
										</Label>
									</li>
								</Link>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
