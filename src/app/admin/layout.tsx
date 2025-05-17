'use client'
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProviderStore } from "../../../public/config/ProviderStore";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderAdmin } from "../../../public/Page/HeaderAdmin";
import { useEffect, useState } from "react";
import { apiUserCurrent } from "../../../public/services/userApi";
import { UserCurrent, UserData } from "../../../public/utils/type";
import { Button } from "@/components/ui/button";

export default function AminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [userData, setUserData] = useState<UserData>();
    const [isLoggedIn, setIsLoggedIn] = useState('');

    useEffect(() => {
        const logggedIn = () => {
            if (localStorage.getItem("persist:auth")) {
                const authData = localStorage.getItem("persist:auth");
                const isLoggedIn = authData ? JSON.parse(authData)?.isLoggedIn : null;
                setIsLoggedIn(isLoggedIn)
            }

        }
        logggedIn();
    }, [])


    useEffect(() => {
        const fetchUser = async () => {
            const responsive = await apiUserCurrent() as UserCurrent;
            if (responsive?.data?.code === 0) {
                setUserData(responsive?.data?.users)
            }
        }
        fetchUser();
    }, [])

    const handdleBack = () => {
        history.back();
    }

    return (
        isLoggedIn === "true" && userData?.role === "Admin" ? <ProviderStore>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    <div className="w-[90%] m-auto mt-[30px]">
                        <HeaderAdmin />
                    </div>
                    <div className="w-[90%] m-auto">
                        <div className="my-6">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </ProviderStore>
            : <div className="flex flex-col items-center h-[100vh] gap-2 justify-center">
                <span className="text-blue-600 font-bold font-mono">Bạn không được phép vào trang Admin</span>
                <Button type="button" className="text-white bg-black my-3 hover:bg-[#ccc] hover:cursor-pointer" onClick={handdleBack}>
                    Quay lại
                </Button>
            </div>
    );
}
