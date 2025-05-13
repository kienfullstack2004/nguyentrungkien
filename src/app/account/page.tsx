'use client';
import { useEffect, useState } from "react";
import { BreadcrumbTag } from "../../../public/Page/BreadcrumbTag";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataResponse, UserCurrent} from "../../../public/utils/type";
import { apiUpdateUserCurrent, apiUserCurrent } from "../../../public/services/userApi";



export default function Page() {


	const [user, setUser] = useState<{
		email: string;
		id: string;
		avatar: string | File;
		faceUrl: string;
		twiUrl: string;
		youUrl: string;
		username: string;
	}>({
		email: "",
		id: "",
		avatar: "",
		faceUrl: "",
		twiUrl: "",
		youUrl: "",
		username: ""
	})
	const [path, setPath] = useState('');

	useEffect(() => {
		setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
	}, [])


	useEffect(() => {
		const fetchData = async () => {
			const responsive = await apiUserCurrent() as UserCurrent;
			if (responsive?.data?.code === 0) {
				setUser(responsive?.data?.users);
			}
		}
		fetchData();
	}, [])


	async function onSubmit() {
		if (user?.avatar) {
			const formData = new FormData();

			if (user?.avatar) {
				formData.append('file', user?.avatar);
			}
			formData.append('upload_preset', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
			formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

			const imgApi = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
				method: 'post',
				body: formData
			})

			const img = await imgApi.json();

			const imgUrl = img.secure_url;
			console.log(imgUrl)

			const obj : {
		email: string;
		id: string;
		avatar: string | File;
		faceUrl: string;
		twiUrl: string;
		youUrl: string;
		username: string;
	} = {
				email: user?.email,
				id: user?.id,
				avatar: imgUrl,
				faceUrl: user?.faceUrl,
				twiUrl: user?.twiUrl,
				youUrl: user?.youUrl,
				username: user?.username
			}

    //    console.log(obj)

			const fetchData = async () => {
				const responsive = await apiUpdateUserCurrent(obj) as DataResponse;
				if (responsive?.data?.code === 0) history.back();
			}
			fetchData();
		}
	}

	return (
		<div>
			<div className="mt-[-9px] w-full flex min-md:justify-end max-md:justify-start">
				<BreadcrumbTag tags={path} />
			</div>
			<div className="max-md:my-4">
				<Label>Email</Label>
				<Input
					type="email"
					className="w-full input outline-none my-1"
					onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
					placeholder="Nhập email của bạn vào đây ..."
					value={user?.email}
				/>
				<Label className="mt-5 mb-[-12px]">Username</Label>
				<Input className="w-full input outline-none my-4" placeholder="Nhập username của bạn vào đây ..." value={user?.username} onChange={e => setUser(prev => ({ ...prev, username: e.target.value }))} />
				<Label className="mt-5 mb-[-12px]">youUrl</Label>

				<Input className="w-full input outline-none my-4" placeholder="Nhập youUrl của bạn vào đây ..." value={user?.youUrl} onChange={e => setUser(prev => ({ ...prev, youUrl: e.target.value }))} />
				<Label className="mt-5 mb-[-12px]">TwiUrl</Label>

				<Input className="w-full input outline-none my-4" placeholder="Nhập TwiUrl của bạn vào đây ..." value={user?.twiUrl} onChange={e => setUser(prev => ({ ...prev, twiUrl: e.target.value }))} />
				<Label className="mt-5 mb-[-12px]">faceUrl</Label>

				<Input className="w-full input outline-none my-4" placeholder="Nhập faceUrl của bạn vào đây ..." value={user?.faceUrl} onChange={e => setUser(prev => ({ ...prev, faceUrl: e.target.value }))} />
				<Label className="mt-5 mb-[-12px]">Avatar</Label>

				<Input type="file"
					onChange={e => {
						const file = e.target.files ? e.target.files[0] : '';
						if (file) {
							setUser(prev => ({ ...prev, avatar: file }))
						}
					}
					}
					className="w-full input outline-none my-4"
				/>
				<div className="mt-4 p-3 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
					<div onClick={onSubmit}>Cập nhật tài khoản</div>
				</div>
			</div>
		</div>
	);
}
