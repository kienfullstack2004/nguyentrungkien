'use client'
import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../../public/Page/BreadcrumbTag";
import { apiYoutubes } from "../../../../public/services/userApi";
import { ApiYoutubeCreate, YoutubeData } from "../../../../public/utils/type";


export default function Page() {
	const [path, setPath] = useState('')
	const [youtubes, setYoutube] = useState<YoutubeData>();
	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiYoutubes() as ApiYoutubeCreate;
			if (responsive?.data?.code === 0) {
				setYoutube(responsive?.data?.ytbs);
			}
		}

		fetchData();
	}, [])


	return (
		<div>
			<div className="mt-[-9px] w-full flex justify-end">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="grid min-md:grid-cols-2 max-md:grid-cols-1 gap-3">
				{youtubes?.map((item, index) => {
					return <div key={index}>
						<iframe width="560" height="315" src={"https://www.youtube.com/embed/" + item?.code} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
						<div className="inline-block bg-green-400 my-2 p-1 rounded-md">
							<span className="text-white text-[12px]">{item?.log}</span>
						</div>
					</div>
				})}
			</div>
		</div>
	);
}
