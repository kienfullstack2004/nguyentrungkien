'use client';
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";
import { apiNews } from "../services/postApi";
import { DataResponsive } from "../utils/type";

export default function PostPopular() {

    const [news, setNews] = useState<[{
        desshort: string,
        id: string,
        image: string | File,
        title: string,
        dess: string
    }]>([
        {
            id: "",
            desshort: "",
            image: "",
            title: "",
            dess: ""
        }
    ]);



    useEffect(() => {
        const fetchData = async () => {
            const responsive = await apiNews() as DataResponsive;
            if (responsive?.data?.code === 0) {
                setNews(responsive?.data?.news);
            }
            console.log(responsive?.data?.news)
        }
        fetchData();
    }, [])


    return <div className="flex flex-col">
        <div className="flex justify-between">
            <div className="font-extrabold">
                Bài viết nổi bật
            </div>
            <Link href="/news" className="hover:underline text-blue-500">Xem chi tiết</Link>
        </div>
        <div className="grid min-md:grid-cols-3 max-md:grid-cols-1 gap-1">
            {news?.map((item, index) => {
                return <div className="my-3 rounded-md" key={index}>
                    <Link href={`/news/` + item?.id}>
                        {item?.image && <Image className="object-center w-full h-[350px]"
                            src={typeof item?.image === "string" ? item?.image : ""}
                            height={350} width={350} alt="logo" />}
                        <div className="font-mono my-2 font-extrabold text-justify p-4">
                            {item?.title}
                        </div></Link>
                </div>
            })}


        </div>
    </div>
};