import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUserCurrent } from "../../public/services/userApi";
import { UserCurrent, UserData } from "../../public/utils/type";
import { useDispatch } from "react-redux";
import { logout } from "../../public/store/action/auth";
import reduxStore from "../../public/config/redux";
import {redirect} from "next/navigation";
const { store } = reduxStore();

console.log(store)

type AppDispatch = typeof store.dispatch


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
    const [userData, setUserData] = useState<UserData>();
    const dispatch = useDispatch<AppDispatch>();
 

    useEffect(() => {
        if (location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]?.split('/').length > 1) {
            setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1].toString()?.split('/')[0]);
        } else {
            setPath(location.href?.split(`${process.env.NEXT_PUBLIC_URL}`)[1]);
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const responsive = await apiUserCurrent() as UserCurrent;
            if (responsive?.data?.code === 0) {
                setUserData(responsive?.data?.users);
            }
        }
        fetchData();
    }, []);

    const handdleLogout = () => {
        dispatch(logout());
        redirect('/login')
    }


    return (
        <Sidebar>
            <SidebarHeader className="bg-[#fff]">
                <SidebarGroup>
                    <SidebarGroupLabel>TRANG QUẢN LÝ CỦA {path === 'user' ? 'CÁ NHÂN' : 'ADMIN'}</SidebarGroupLabel>
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
            <SidebarFooter className="bg-[#fff]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {userData?.username}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <Link href={'/account'}>
                                        <span>Account</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <div onClick={handdleLogout}>
                                        Sign out
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>

    )
}