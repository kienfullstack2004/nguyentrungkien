'use client';
import Link from "next/link";
import { icons } from "../utils/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import Search from "../Page/Search";
import { apiUserCurrent } from "../services/userApi";
import { UserCurrent, UserData } from "../utils/type";
import Image from "next/image";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "../store/reducer/rootReducer"; // Ensure this type reflects your Redux store structure
import { logout } from "../store/action/auth";
import reduxStore from "../config/redux";
const { FaUserEdit, FaBell, BiSolidMessageRoundedDetail, IoMdLogOut, HiMenu } = icons;
const { store } = reduxStore();

// Remove this line as RootState is now imported directly

console.log(store)

type AppDistach = typeof store.dispatch;

export type RootState = typeof rootReducer;

export default function Header() {

    const [isMenu, setMenu] = useState(false);
    const [isBell, setBell] = useState(false);
    const [isMessage, setMessage] = useState(false);
    const [isAccount, setAccount] = useState(false);
    const [userData,setUserData] = useState<UserData>();
    const {isLoggedIn} = useSelector((state: RootState) => state?.auth);
    const dispatch = useDispatch<AppDistach>();

    console.log(isLoggedIn)

    const handdleClose = () => {
        setMenu(false);
    }

    const handdleMenu = () => {
        setMenu(true);
    }

    useEffect(() => {
        AOS.init();
    }, [])

    const openBell = () => {
        setBell(!isBell)
    }
    const openMessge = () => {
        setMessage(!isMessage)
    }
    const openAccount = () => {
        setAccount(!isAccount)
    }

    useEffect(() => {
        const fetchUser = async () => {
            const responsive = await apiUserCurrent() as UserCurrent;
            if (responsive?.data?.code === 0) {
                setUserData(responsive?.data?.users)
            }
        }

        fetchUser();


    }, [])



    return <div className="h-[100px] flex items-center">
        <div className="max-md:hidden flex gap-[35px] items-center justify-between w-[90%] m-auto">
            <div className="flex items-center gap-[35px]">
                <div className="font-bold text-3xl">
                    <Link href={'/'}>
                        nguyentrungkien.com</Link>
                </div>
                <ul className="flex items-center gap-[35px]">
                    <li className="hover:text-blue-600">
                        <Link href="/courses">
                            Khoá học
                        </Link>
                    </li>
                    <li className="hover:text-blue-600">
                        <Link href="/news">
                            Tin tức
                        </Link>
                    </li>
                </ul>
            </div>
           {isLoggedIn && <ul className="max-md:hidden gap-[35px] flex items-center">
                <li className="relative">
                    <FaBell onClick={openBell} size={25} />
                    <div className="absolute top-[-5px] right-0 text-[12px] w-[15px] h-[15px] rounded-full flex items-center justify-center text-white bg-red-600">
                        2
                    </div>
                    {isBell && <div data-aos="fade-down" className="absolute right-[-2px] text-[12px] bg-[#fff] shadow-2xl min-md:w-[500px] rounded-md flex flex-col justify-center">
                        <h1 className="font-semibold p-5">Tin nhắn (2)</h1>
                        <ul className="flex flex-col items-center">
                            <li className="flex flex-col hover:bg-[#ddd] p-4">
                                <Link href="/" className="text-justify">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur reiciendis, amet, aut dolor accusamus commodi, repellat eum odit rerum officiis sit distinctio? Repellendus nam vitae aliquid numquam consequuntur quasi? Deserunt.
                                </Link>
                                <div className="flex gap-2 justify-end text-[#ccc] w-[90%] m-auto">
                                    <div className="italic">
                                        nguyen trung kien
                                    </div>
                                    <div>
                                        12 gio truoc
                                    </div>
                                </div>
                            </li>
                            <li className="flex flex-col hover:bg-[#ddd] p-4">
                                <Link href="/" className="text-justify">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur reiciendis, amet, aut dolor accusamus commodi, repellat eum odit rerum officiis sit distinctio? Repellendus nam vitae aliquid numquam consequuntur quasi? Deserunt.
                                </Link>
                                <div className="flex gap-2 justify-end text-[#ccc] w-[90%] m-auto">
                                    <div className="italic">
                                        nguyen trung kien
                                    </div>
                                    <div>
                                        12 gio truoc
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>}
                </li>
                <li className="relative">
                    <BiSolidMessageRoundedDetail onClick={openMessge} size={25} />
                    <div className="absolute top-[-5px] right-[-2px] text-[12px] w-[15px] h-[15px] rounded-full flex items-center justify-center text-white bg-red-600">
                        2
                    </div>
                    {isMessage && <div data-aos="fade-down" className="absolute right-[-2px] text-[12px] bg-[#fff] shadow-2xl min-md:w-[500px] rounded-md flex flex-col justify-center">
                        <h1 className="font-semibold p-5">Tin nhắn (2)</h1>
                        <ul className="flex flex-col items-center">
                            <li className="flex flex-col hover:bg-[#ddd] p-4">
                                <Link href="/" className="text-justify">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur reiciendis, amet, aut dolor accusamus commodi, repellat eum odit rerum officiis sit distinctio? Repellendus nam vitae aliquid numquam consequuntur quasi? Deserunt.
                                </Link>
                                <div className="flex gap-2 justify-end text-[#ccc] w-[90%] m-auto">
                                    <div className="italic">
                                        nguyen trung kien
                                    </div>
                                    <div>
                                        12 gio truoc
                                    </div>
                                </div>
                            </li>
                            <li className="flex flex-col hover:bg-[#ddd] p-4">
                                <Link href="/" className="text-justify">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur reiciendis, amet, aut dolor accusamus commodi, repellat eum odit rerum officiis sit distinctio? Repellendus nam vitae aliquid numquam consequuntur quasi? Deserunt.
                                </Link>
                                <div className="flex gap-2 justify-end text-[#ccc] w-[90%] m-auto">
                                    <div className="italic">
                                        nguyen trung kien
                                    </div>
                                    <div>
                                        12 gio truoc
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>}
                </li>
                <li className="relative">
                    {userData?.avatar ? <div onClick={openAccount} className="w-[50px] h-[50px] rounded-full">
                        <Image src={typeof userData?.avatar === 'string' ? userData.avatar : ''} width={50} className="w-[50px] h-[50px] rounded-full" height={50} alt="logo" />
                    </div> : <Avatar onClick={openAccount}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>}
                    {isAccount && <div data-aos="fade-down" className="absolute z-10 right-0 text-[12px] bg-[#fff] min-md:w-[300px] shadow-2xl rounded-md flex flex-col justify-center">
                        <div className="flex gap-2 p-4">
                            <div>
                                {userData?.avatar ? <div onClick={openAccount} className="w-[50px] h-[50px] rounded-full">
                                    <Image src={typeof userData?.avatar === 'string' ? userData.avatar : ''} width={50} className="w-[50px] h-[50px] rounded-full" height={50} alt="logo" />
                                </div> : <Avatar onClick={openAccount}>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex gap-2">
                                    <h1 className="font-bold">Tên tài khoản :</h1> <span>{userData?.username}</span>
                                </div>
                                <div className="flex gap-2">
                                    <h1 className="font-bold">Email :</h1> <span>{userData?.email}</span>
                                </div>
                                <div className="flex gap-2">
                                    <h1 className="font-bold">Mã tài khoản :</h1> <span>{userData?.id.slice(0, 15) + '...'}</span>
                                </div>
                                {userData?.role && <div className="flex gap-2">
                                    <h1 className="font-bold">Vai trò :</h1> <span>{userData?.role === 'User' && 'Khách hàng'}</span>
                                </div>}
                                {userData?.createdAt && <div className="flex gap-2">
                                    <h1 className="font-bold">DKTK :</h1> <span>{moment(userData?.createdAt).fromNow()}</span>
                                </div>}
                                <div className="flex my-3 gap-2">
                                    <h1 className="font-bold">Youtube :</h1>
                                    <Link href={'/user'}>
                                        <div className="hover:cursor-pointer items-center justify-center px-[9px] rounded-md border-1 border-red-600 bg-red-600 text-white">
                                            Youtube
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <ul className="flex flex-col">
                            <li className="hover:bg-[#ddd]">
                                <Link href="/user" className="flex p-4 gap-3"><div><FaUserEdit size={20} /></div><span>Quản lý tài khoản</span></Link>
                            </li>
                            <li className="hover:bg-[#ddd]">
                                <div className="flex p-4 gap-3 hover:cursor-pointer" onClick={() => dispatch(logout())}><div ><IoMdLogOut size={20} /></div><span>Đăng xuất</span></div>
                            </li>
                        </ul>
                    </div>}
                </li>
            </ul>}
        </div>


        <div className="flex items-center min-md:hidden w-[90%] p-4 m-auto ">
            <div className="flex  m-auto min-md:hidden">
                <Search />
            </div>
            <div >
                <HiMenu onClick={handdleMenu} size={30} color="#000" />
            </div>
        </div>
        {isMenu && <div data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500" className="fixed z-10 bottom-0 top-0 right-0 bg-white w-[90%]">
            <div className="flex w-[80%] h-[30%] items-center m-auto">
                <div className="flex flex-col items-center gap-3">
                    <div className="">
                        <Avatar className="w-[80px] h-[80px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex text-[18px] flex-col">
                        <div className="flex">
                            <h1 className="font-bold">Username : </h1> <span>nguyentrungkien</span>
                        </div>
                        <div className="flex"   >
                            <h1 className="font-bold">Mã code : </h1> <span>{`dcdaskljcdnskljcndsk`.slice(0, 20) + '...'}</span>
                        </div>
                        <div className="flex">
                            <h1 className="font-bold">Email : </h1> <span>nkien9450@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[70%]">
                <ul className="flex flex-col">
                    <li className="py-4 px-12 hover:bg-[#ddd]">
                        <Link href="#" className="flex gap-2 items-center"><FaUserEdit size={20} /> Quản lý tài khoản cá nhân</Link>
                    </li>
                    <li className="py-4 px-12 hover:bg-[#ddd]">
                        <Link href="#" className="flex gap-2 items-center"><FaUserEdit size={20} /> Quản lý tài khoản cá nhân</Link>
                    </li>
                    <li className="py-4 px-12 hover:bg-[#ddd]">
                        <Link href="#" className="flex gap-2 items-center"><IoMdLogOut size={20} /> Đăng xuất</Link>
                    </li>
                </ul>
                <div className="mt-5 text-center" onClick={handdleClose}>
                    <Button className="bg-[#000] text-[#fff]">Thoát</Button>
                </div>
            </div>
        </div>}
    </div>
}