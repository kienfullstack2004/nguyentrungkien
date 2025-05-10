'use client'

import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../public/Page/BreadcrumbTag";


export default function Page() {

	const [path, setPath] = useState('')

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path}/>
			</div>
			<div className="grid min-md:grid-cols-2 max-md:grid-cols-1 gap-3">
				<iframe width="560" height="315" src="https://www.youtube.com/embed/nMp4wOUMfdc?si=2jMvKMj-B1Bq6Q5E" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/nMp4wOUMfdc?si=2jMvKMj-B1Bq6Q5E" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/nMp4wOUMfdc?si=2jMvKMj-B1Bq6Q5E" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
			</div>
		</div>
	);
}
