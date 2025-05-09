'use client';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { icons } from "../utils/icons"
import Link from "next/link";

const { RiBook2Fill } = icons;

export function HeaderUser() {
    return (
        <div className="w-full">
            <Menubar className="w-full border border-[#ccc]">
                <MenubarMenu>
                    <MenubarTrigger>Chỉnh sửa</MenubarTrigger>
                    <MenubarContent className="bg-white border border-[#ccc]">
                        <Link href={'/user/news/edit'}>
                            <MenubarItem>
                                Bài viết <MenubarShortcut><RiBook2Fill size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Thêm mới</MenubarTrigger>
                    <MenubarContent className="bg-white border border-[#ccc]">
                        <Link href={'/user/news/create'}>
                            <MenubarItem>
                                Bài viết <MenubarShortcut><RiBook2Fill size={25} color="#000" /></MenubarShortcut>
                            </MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}
