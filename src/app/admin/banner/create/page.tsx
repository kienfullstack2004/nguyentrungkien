'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../../public/Page/BreadcrumbTag";



export default function Page() {
	const [path, setPath] = useState('')

	useEffect(() => {
		setPath(location.href?.split('http://localhost:3000/')[1]);
	}, [])
	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>

			<p>Page content</p>
		</div>
	);
}
