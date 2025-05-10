'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function Page() {
	const [path, setPath] = useState('')

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])
	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="flex flex-col gap-3">
				<Label className="text-3xl">
					Ảnh banner
				</Label>
				<Input type="file" className="border border-[#ccc]" />
				<Button className="bg-black text-white hover:bg-[#ddd] hover:cursor-pointer" type="button">
					Tạo banner
				</Button>
			</div>
		</div>
	);
}
