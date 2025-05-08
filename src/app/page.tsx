'use client';
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { icons } from '../../public/utils/icons';
import { useState } from 'react';

const { HiMenu, IoIosClose } = icons;

export default function Home() {
  const path = useRouter();
  const [isMenu, setMenu] = useState(false);

  const handdleMenu = () => {
    setMenu(true);
  }

  const handdleClose = () => {
    setMenu(false);
  }

  return (
    <div className="overflow-hidden">
      <div className="header-image">

      </div>
      <div className="header-overload">
      </div>
      <div className="header-info">
        <div className="h-[15%] flex min-md:items-center max-md:justify-between text-white">
          <div className="min-md:w-[90%] m-auto max-md:w-[80%] flex items-center justify-between">
            <div className="min-md:text-[25px] max-md:text-[12px] font-bold">
              <Link href={'/'}>
                nguyentrungkien.com
              </Link>
            </div>
            <ul className="max-md:hidden flex items-center gap-[35px]">
              <li className="hover:text-blue-500">
                <a href="/courses">
                  Khoá học
                </a>
              </li>
              <li className="hover:text-blue-500">
                <a href="/news">
                  Tin tức
                </a>
              </li>
              <li className="hover:text-blue-500">
                <a href="/contact">
                  Liên hệ
                </a>
              </li>
              <li className="hover:text-blue-500">
                <a href="/support">
                  Báo cáo
                </a>
              </li>
              <li>
                <Button className='hover:cursor-pointer' onClick={() => path.push('/register')} variant={'outline'}>
                  Đăng ký
                </Button>
              </li>
              <li >
                <Button className='hover:cursor-pointer' onClick={() => path.push('/login')} variant={'outline'}>
                  Đăng nhập
                </Button>
              </li>
            </ul>
            <div onClick={handdleMenu} className='min-md:hidden flex items-center'>
              <HiMenu size={20} color='#fff' />
            </div>
            {isMenu && <div className='min-md:hidden fixed bg-white top-0 left-0 right-0 bottom-0'>
              <div className='h-[10%] w-[80%] m-auto flex items-center justify-between'>
                <div className='text-[20px] text-[#000] font-bold'>
                  nguyentrungkien.com
                </div>
                <div onClick={handdleClose} className='flex items-center'>
                  <IoIosClose size={25} color='#ccc' />
                </div>
              </div>
              <div className='h-[90%] flex flex-col items-center justify-between'>
                <ul className="flex flex-col text-[25px] text-black items-center">
                  <li className="hover:bg-[#ddd] p-5 ">
                    <a href="/courses">
                      Khoá học
                    </a>
                  </li>
                  <li className="hover:bg-[#ddd] p-5 ">
                    <a href="/news">
                      Tin tức
                    </a>
                  </li>
                  <li className="hover:bg-[#ddd] p-5 ">
                    <a href="/contact">
                      Liên hệ
                    </a>
                  </li>
                  <li className="hover:bg-[#ddd] p-5 ">
                    <a href="/support">
                      Báo cáo
                    </a>
                  </li>
                </ul>
                <div className='flex items-center gap-4 mb-5'>
                  <Button className='hover:cursor-pointer bg-black text-white' onClick={() => path.push('/register')} variant={'outline'}>
                    Đăng ký
                  </Button>
                  <Button className='hover:cursor-pointer bg-black text-white' onClick={() => path.push('/login')} variant={'outline'}>
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </div>}
          </div>
        </div>
        <div className='w-[90%] h-[85%] justify-center flex flex-col gap-3 m-auto text-white'>
          <div className='font-bold min-md:text-[25px] max-md:text-[20px]'>
            Website tin tức & khoá học cá nhân của Nguyễn Trung Kiên
          </div>
          <p className='min-md:text-[18px] max-md:text-[15px]'>Trang web giúp người đọc có những trải nhiệm khám phá mới mẻ và các bài học bổ ích khám phá ngay.</p>
          <div>
            <Button onClick={()=>path.push('home')} className='hover:cursor-pointer' variant={'outline'}>
              Khám phá
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
