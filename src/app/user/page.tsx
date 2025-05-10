'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../public/Page/BreadcrumbTag";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CountUp from 'react-countup';

export default function Page() {

	const [path, setPath] = useState('')

	useEffect(() => {
		setPath(location.href ??.split('http://localhost:3000/')[1]);
	}, [])


	return (
		<div>
			<div className="mt-[-9px] w-full flex min-md:justify-end max-md:justify-start">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="flex flex-col">
				<Label className="text-3xl max-md:my-5 text-blue-400 font-mono">
					Thống kê lượt
				</Label>
				<div className="grid min-md:grid-cols-3 max-md:grid-cols-1 gap-2 my-3">
					<Card className="border border-[#ccc]">
						<CardHeader>Bài viết</CardHeader>
						<CardContent className="text-3xl font-bold text-blue-400 flex items-center justify-center">
							<CountUp end={120} duration={10} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
