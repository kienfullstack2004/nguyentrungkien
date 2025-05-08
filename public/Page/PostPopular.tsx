'use client';
import Image from "next/image";
import Link from "next/link"

export default function PostPopular() {
    return <div className="flex flex-col">
        <div className="flex justify-between">
            <div className="font-extrabold">
                Bài viết nổi bật
            </div>
            <Link href="/news" className="hover:underline text-blue-500">Xem chi tiết</Link>
        </div>
        <div className="grid min-md:grid-cols-3 max-md:grid-cols-1 gap-2">
            <div className="my-3">
                <Link href="/lksajxna"> <Image className="object-center" src={'https://res.cloudinary.com/dp6cr7ea5/image/upload/v1745409070/person/zu3jarzz0q8lpw8rnhwf.jpg'} height={500} width={500} alt="logo" />
                    <div className="font-mono my-2 font-extrabold text-justify p-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo deserunt quos a, non iste possimus amet aperiam ipsum ducimus tempore velit atque ratione aspernatur temporibus vel voluptates optio fuga quo?
                    </div></Link>
            </div>


        </div>
    </div>
};