import axiosConfig from "../config/axiosConfig";

export const apiUsers = () =>new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:'get',
            url:'users'
        })
        relsove(responsive);
    } catch (err) {
       return reject(err); 
    } 
})

