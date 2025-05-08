'use client';
import { icons } from "../utils/icons"
const {FaSearch} = icons
export default function Search(){ 
    return <div className="relative">
         <input className="outline-none max-md:w-[300px] border px-3 py-2 rounded-md border-[#ccc]" placeholder="Nhập nội dung để tìm ..."/>
         <FaSearch className="absolute right-[9px] top-[8px]" color="#ccc" size={25}/>
    </div>
 };