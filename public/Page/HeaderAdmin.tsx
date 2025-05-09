'use client';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"
import { icons } from "../utils/icons"

const { RiBook2Fill,
    GiKnightBanner,
    TiStopwatch, FaBitcoin, MdOutlineBookmark } = icons;

export function HeaderAdmin() {
    return (
        <div className="w-full">
            <Menubar className="w-full border border-[#ccc]">
                <MenubarMenu>
                    <MenubarTrigger>Chỉnh sửa</MenubarTrigger>
                    <MenubarContent className="bg-white border border-[#ccc]">
                        <Link href={'/admin/news/edit'}>
                            <MenubarItem>
                                Bài viết <MenubarShortcut><RiBook2Fill size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                        <Link href={'/admin/courses/edit'}>
                            <MenubarItem>
                                Khoá học <MenubarShortcut><FaBitcoin size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Thêm mới</MenubarTrigger>
                    <MenubarContent className="bg-white border border-[#ccc]">
                        <Link href={'/admin/news/create'}>
                            <MenubarItem>
                                Bài viết <MenubarShortcut><RiBook2Fill size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                        <Link href={'/admin/banner/create'}>
                            <MenubarItem>
                                Quảng cáo <MenubarShortcut><GiKnightBanner size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                        <Link href={'/admin/courses/create'}>
                            <MenubarItem>
                                Khoá học <MenubarShortcut><FaBitcoin size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                        <Link href={'/admin/video/create'}>
                            <MenubarItem>
                                Youtube <MenubarShortcut><FaBitcoin size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                        <Link href={'/admin/save/create'}>
                            <MenubarItem>
                                Yêu thích <MenubarShortcut><MdOutlineBookmark size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Xem</MenubarTrigger>
                    <MenubarContent className="bg-white border border-[#ccc]">
                        <Link href={'/admin/video'}>
                            <MenubarItem>
                                Video <MenubarShortcut><TiStopwatch size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                        <Link href={'/admin/save'}>
                            <MenubarItem>
                                Lưu <MenubarShortcut><MdOutlineBookmark size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <Link href={'/admin/setting'}>
                        <MenubarTrigger>Cài đặt</MenubarTrigger>
                    </Link>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}
