import axiosConfig from "../config/axiosConfig";


export const apiUsers = () => new Promise(async (relsove, reject) => {
    try {
        const responsive = await axiosConfig({
            method: 'get',
            url: 'users'
        })
        relsove(responsive);
    } catch (err) {
        return reject(err);
    }
})
export const apiUserCurrent = () => new Promise(async (relsove, reject) => {
    try {
        const responsive = await axiosConfig({
            method: 'get',
            url: 'current/user'
        })
        relsove(responsive);
    } catch (err) {
        return reject(err);
    }
})
export const apiUpdateUserCurrent = (payload: {
    email: string;
    id: string;
    avatar: string | File;
    faceUrl: string;
    twiUrl: string;
    youUrl: string;
    username: string;
}) => new Promise(async (relsove, reject) => {
    try {
        const responsive = await axiosConfig({
            method: 'post',
            url: 'current/updateUser',
            data: payload
        })
        relsove(responsive);
    } catch (err) {
        return reject(err);
    }
})

export const apiCreateComment = (payload:{message:string,code:string}) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:"post",
            url:"public/comment",
            data:payload
        })
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})

export const apiComments = (id:string) => new Promise(async(resolve,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:"get",
            url:"public/comments/"+id
        })
        resolve(responsive)
    } catch (error) {
        return reject(error);
    }
}) 

export const apiCreateYoutube = (payload:{code:string,type:string,log:string}) => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:"post",
            url:"public/createYtbs",
            data:payload
        });
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})

export const apiYoutubes = () => new Promise(async(relsove,reject)=>{
    try {
        const responsive = await axiosConfig({
            method:"get",
            url:"public/ytbs",
        });
        relsove(responsive);
    } catch (error) {
        return reject(error);
    }
})