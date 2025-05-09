'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const FormBody = z.object({
	title: z.string().min(2, { message: "Vui lòng nhập ít nhất 100 kí tự hoặc 1 tiêu đề hoàn chỉnh" }),
	dess: z.string().min(6, { message: "Vui lòng nhập đủ 6 kí tự !" }),
	img: z.string().min(6, { message: 'Vui lòng không để trống !' }),
	desshort: z.string().min(6, { message: "Vui lòng nhật ít nhất 6 từ" }),
	viewer: z.string(),
}).strict();

type FormBodyType = z.infer<typeof FormBody>;


export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

	console.log(id)

	const form = useForm<FormBodyType>({
		resolver: zodResolver(FormBody),
		defaultValues: {
			title: "",
			dess: "",
			desshort: "",
			img: ""
		}
	})

	function onSubmit(data: FormBodyType) {
		console.log(data)
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tiêu đề</FormLabel>
								<FormControl>
									<Input className="w-full input outline-none my-1" placeholder="Nhập email của bạn vào đây ..." {...field} />
								</FormControl>
								<FormMessage className="text-red-600 mt-[-8px]" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="desshort"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-5 mb-[-12px]">Mô tả ngắn</FormLabel>
								<FormControl>
									<Input className="w-full input outline-none my-4" placeholder="Nhập mô tả ngắn của bạn vào đây ..." {...field} />
								</FormControl>
								<FormMessage className="mt-[-20px] text-red-600" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dess"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-5">Nội dung bài viết</FormLabel>
								<FormControl>
									<Textarea className="resize-none input h-[500px]" spellCheck={false} placeholder="Nhập mô tả của bạn vào đây ..." {...field} />
								</FormControl>
								<FormDescription className="text-center text-[#ccc]">
									Nội dung bài viết phải chi tiết và đầy đủ nội dung.
								</FormDescription>
								<FormMessage className="mt-[-20px] text-red-600" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="img"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-5">Ảnh bài viết</FormLabel>
								<FormControl>
									<Input type="file" className="w-full input outline-none my-4" {...field} />
								</FormControl>
								<FormMessage className="mt-[-20px] text-red-600" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="viewer"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mt-5">Lượt xem</FormLabel>
								<FormControl>
									<Input defaultValue={12} readOnly className="w-full cursor-no-drop input bg-[#ddd] outline-none my-4" {...field} />
								</FormControl>
								<FormMessage className="mt-[-20px] text-red-600" />
							</FormItem>
						)}
					/>
					<div className="mt-4 text-center bg-[#000] text-white rounded-md hover:bg-[#ccc] hover:cursor-pointer">
						<Button type="submit">Cập nhật bài viết</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
