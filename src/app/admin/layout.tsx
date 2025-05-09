'use client'
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProviderStore } from "../../../public/config/ProviderStore";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderAdmin } from "../../../public/Page/HeaderAdmin";


export default function AminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <ProviderStore>
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
    );
}
