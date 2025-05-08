'use client';
import { Input } from "@/components/ui/input";
import { icons } from "../utils/icons";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
const { AiFillCopyrightCircle } = icons;

const FormBoy = z.object({
    message: z.string().email({ message: "Vui lòng nhập đúng định dạng @gmail.com" })
}).strict();

type FormBoyType = z.infer<typeof FormBoy>;

export default function Footer() {

    const form = useForm<FormBoyType>({
        resolver: zodResolver(FormBoy),
        defaultValues: {
            message: ""
        }
    })

    function onSubmit(data: FormBoyType) {
        emailjs.sendForm('service_0vfekc9', 'template_6ega6nr', data.message, 'ZsnYH_J_vw7MZsuIw');  
    }

    return <div className="text-white flex flex-col bg-[#181821] ">
        <div className="w-[90%] pb-8 flex max-md:flex-col gap-[20px] m-auto">
            <div className="">
                <h1 className="font-bold text-[30px] mt-5 mb-5">nguyentrungkien.com</h1>
                <ul className="flex flex-col justify-center ">
                    <li className="flex text-[12px]">
                        <div>Email :</div>
                        <a href="">
                            nkien9450@gmail.com
                        </a>
                    </li>
                    <li className="flex text-[12px]">
                        <div>Điện thoại :</div>
                        <a href="tel:0336099317">
                            0336 099 317
                        </a>
                    </li>
                    <li className="flex text-[12px]">
                        <div>Địa chỉ :</div>
                        <a href="">
                            K54/32 Ông Ích Khiêm, P.Thanh Bình, Q.Hải Châu, TP.Đà Nẵng
                        </a>
                    </li>
                </ul>
            </div>
            <div className="">
                <h1 className="font-bold text-[30px] mt-5 mb-5">Công cụ</h1>
                <ul className="flex flex-col justify-center ">
                    <li className="flex text-[12px]">
                        <a href="">
                            Rút ngắn liên kết
                        </a>
                    </li>
                    <li className="flex text-[12px]">
                        <a href="">
                            Tạo gmail miễn phí
                        </a>
                    </li>
                    <li className="flex text-[12px]">
                        <a href="">
                            Tạo Website blogger
                        </a>
                    </li>
                </ul>
            </div>
            <div className="">
                <h1 className="font-bold text-[30px] mt-5 mb-5">Điều khoản & bảo mật</h1>
                <ul className="flex flex-col justify-center ">
                    <li className="flex text-[12px]">
                        <a href="">
                            Điều khoản
                        </a>
                    </li>
                    <li className="flex text-[12px]">
                        <a href="">
                            Bảo mật
                        </a>
                    </li>
                </ul>
            </div>
            <div className="">
                <h1 className="font-bold text-[30px] mt-5 mb-5">Liên hệ</h1>
                <ul className="flex flex-col justify-center ">
                    <li className="flex text-[12px] w-full gap-2">
                        <Form {...form}>
                            <form className="min-md:flex  gap-2 max-md:w-full" onSubmit={form.handleSubmit(onSubmit)}>
                                <Input className="max-md:w-full min-md:w-[230px]" defaultValue={'nkien9450@gmail.com'} hidden name="email_from" />
                                <Input className="max-md:w-full min-md:w-[230px]" defaultValue={'Nguyễn Trung Kiên'} hidden name="username" />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input spellCheck={false} className=" min-md:w-[300px]" placeholder="Nhập gmail của bạn vào đây ..." {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-600 mt-[-3px]" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="max-md:mt-3 hover:cursor-pointer" variant={'outline'}>
                                    Gửi
                                </Button>
                            </form>
                        </Form>
                    </li>

                </ul>
            </div>

        </div>
        <div className="border-t-1 w-[90%] m-auto border-[#fff]">
            <span className="p-3 flex items-center justify-center gap-2"><AiFillCopyrightCircle size={30} color="#fff" /> Copyright by Nguyễn Trung Kiên {new Date().getFullYear()}</span>
        </div>

    </div >
};