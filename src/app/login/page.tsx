'use client'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiLogin } from "../../../public/services/authApi";
import { DataResponse } from "../../../public/utils/type";
import { redirect } from 'next/navigation';
import { useDispatch } from "react-redux";
import { login } from "../../../public/store/action/auth";
import reduxStore from "../../../public/config/redux";
import {toast} from "react-toastify";
import Toast from "../../../public/utils/Toast";
const { store } = reduxStore();

console.log(store)

type AppDispatch = typeof store.dispatch

const FormBody = z.object({
	email: z.string().email({ message: "Vui lòng nhập đúng theo đuôi có dạng @gmail.com" }),
	password: z.string().min(6, { message: "Vui lòng nhập đủ 6 kí tự !" })
}).strict();

type FormBodyType = z.infer<typeof FormBody>;

export default function Page() {
	const dispatch = useDispatch<AppDispatch>();


	const form = useForm<FormBodyType>({
		resolver: zodResolver(FormBody),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	async function onSubmit(data: FormBodyType) {
		const responsive = await apiLogin(data) as DataResponse;
		if (responsive?.data?.code === 0) {
			dispatch(login(data))
			toast.success("Đăng nhập thành công !"); 
			setTimeout(() => {     
				redirect("/home")
			}, 1000)
		}
	}

	return (
		<div className="h-[100vh] flex items-center justify-center">
			<Card className="max-md:w-[80%] min-md:w-[50%] p-5">
				<h1 className="text-center text-3xl font-bold">Đăng nhập</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input className="w-full input outline-none my-1" placeholder="Nhập email của bạn vào đây ..." {...field} />
									</FormControl>
									<FormMessage className="text-red-600 mt-[-8px]" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mt-5 mb-[-12px]">Password</FormLabel>
									<FormControl>
										<Input type="password" className="w-full input outline-none my-4" placeholder="Nhập mật khẩu của bạn vào đây ..." {...field} />
									</FormControl>
									<FormMessage className="mt-[-20px] text-red-600" />
								</FormItem>
							)}
						/>
						<div className="mt-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
							<Button type="submit">Đăng nhập</Button>
						</div>
					</form>
				</Form>
			</Card>
			<Toast/>
		</div>
	);
}
