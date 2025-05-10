import axiosConfig from "../config/axiosConfig";
import { LoginType, RegisterType } from "../utils/type";



export const apiRegister = (payload:RegisterType) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'post',
            url:'register',
            data:payload
        })
        console.log(payload)
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