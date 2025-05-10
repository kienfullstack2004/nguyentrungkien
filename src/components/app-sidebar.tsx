import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const content = [
    {
        name: 'Khoá học',
        url: '/courses',
    },
    {
        name: 'Tin tức',
        url: '/news',
    },

]

export function AppSidebar() {

    const [path, setPath] = useState('');

    useEffect(() => {
        if (location.href?.split('http://localhost:3000/')[1]?.split('/').length > 1) {
            setPath(location.href?.split('http://localhost:3000/')[1].toString()?.split('/')[0]);
        } else {
            setPath(location.href?.split('http://localhost:3000/')[1]);
        }
    }, [])


    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>TRANG QUẢN LÝ CỦA {path === 'user' ? 'CÁ NHÂN' : 'ADMIN'}</SidebarGroupLabel>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
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
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> nguyễn trung kiên
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>

    )
}