'use client';
import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../public/Page/BreadcrumbTag";

export default function Page() {

	const [path, setPath] = useState('')

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])


	return (
		<div>
			<div className="mt-[-9px] w-full flex min-md:justify-end max-md:justify-start">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="max-md:my-4">
				Page
			</div>
		</div>
	);
}
