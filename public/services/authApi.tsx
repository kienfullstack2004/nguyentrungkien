import axiosConfig from "../config/axiosConfig";
import { LoginType, RegisterType } from "../utils/type";



export const apiRegister = (payload:RegisterType) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'post',
            url:'register',
            data:payload
        })
        relsove(responsive); 
    } catch (err) {
        return reject(err);  
    } 
})
export const apiLogin = (payload:LoginType) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'post',
            url:'login',
            data:payload
        })
        relsove(responsive); 
    } catch (err) {
        return reject(err);  
    } 
})

export const apiCreateBanner = (payload:{image:string}) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'post',
            url:'admin/banner',
            data:payload
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})
export const apiBanners = () => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'get',
            url:'admin/banners',
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})
export const apiDeleteBanners = (id:string) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'delete',
            url:'admin/banner/'+id,
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})


export const apiCreateCousrses = (payload:{title:string,dess:string,desshort:string,image:string,price:string,price_sale:string,time:string}) => new Promise(async(relsove,reject)=>{
    try {
        console.log(payload)
        const responsive = await axiosConfig({
            method:'post',
            url:'admin/createCourses',
            data:payload
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})

export const apiCousrses = () => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'get',
            url:'admin/courses',
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})

export const apiDeleteCousrses = (id:string) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'delete',
            url:'admin/courses/'+id,
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})

export const apiGetOneCousrses = (id:string) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'get',
            url:'admin/courses/'+id,
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})