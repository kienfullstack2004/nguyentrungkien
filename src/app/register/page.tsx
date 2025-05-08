'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField,Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";

const FormBody = z.object({
	email: z.string().email({ message: "Vui lòng nhập đúng theo đuôi có dạng @gmail.com" }),
	password: z.string().min(6, { message: "Vui lòng nhập đủ 6 kí tự !" }),
	username: z.string().min(6,{message:"Vui lòng nhập đủ 6 ký tự !"})
}).strict();

type FormBodyType = z.infer<typeof FormBody>;

export default function Page() {
	
	const form = useForm<FormBodyType>({
       resolver: zodResolver(FormBody),
	   defaultValues:{
          password:"",
		  email:"",
		  username:""
	   }
	})

    function onSubmit(data:FormBodyType){
       console.log(data);
	}

	return (
		<div className="h-[100vh] flex items-center justify-center">
			<Card className="max-md:w-[80%] min-md:w-[50%] p-5">
				<h1 className="text-center text-3xl font-bold">Đăng ký</h1>
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
									<FormMessage  className="text-red-600 mt-[-8px]"/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mt-5 mb-[-12px]">Username</FormLabel>
									<FormControl>
										<Input className="w-full input outline-none my-4" placeholder="Nhập username của bạn vào đây ..." {...field} />
									</FormControl>
									<FormMessage className="mt-[-20px] text-red-600"/>
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
									<FormMessage className="mt-[-20px] text-red-600"/>
								</FormItem>
							)}
						/>
						<div className="mt-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
							<Button type="submit">Đăng ký</Button>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
}
