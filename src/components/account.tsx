'use client';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

const content = [
    {
        name: 'Trang chủ',
        url: '/home',
    },
    {
        name: 'Quản lý cá nhân',
        url: '/user',
    },

]

export function AppSidebar() {


    return (
        <Sidebar>
            <SidebarHeader className="bg-[#fff]">
                <SidebarGroup>
                    <SidebarGroupLabel>TRANG QUẢN LÝ TÀI KHOẢN</SidebarGroupLabel>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent className="bg-[#fff]">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {content?.map((project) => (
                                <SidebarMenuItem key={project.name}>
                                    <SidebarMenuButton asChild>
                                        <Link href={project.url}>
                                            <span>{project.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>

    )
}