'use client'
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProviderStore } from "../../../public/config/ProviderStore";
import { AppSidebar } from "@/components/app-sidebar";
// import { BreadcrumbTag } from "../../../public/Page/BreadcrumbTag";
// import { useEffect, useState } from "react";
import { HeaderUser } from "../../../public/Page/HeaderUser";


export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const [path, setPath] = useState('')

    // useEffect(() => {
    //     setPath(location.href.split('http://localhost:3000/')[1]);
    // }, [])


    return (
        <ProviderStore>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    <div className="w-[80%] m-auto my-4">
                        {/* <BreadcrumbTag tags={path} /> */}
                    </div>
                    <div className="w-[90%] m-auto mt-[30px]">
                        <HeaderUser />
                    </div>
                    <div className="w-[90%] m-auto">
                        <div className="my-6">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </ProviderStore>
    );
}
