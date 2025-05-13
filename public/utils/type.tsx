export type RegisterType = {
    email: string,
    password: string,
    username: string
}

export type LoginType = {
    email: string,
    password: string
}

export type ActionAuth = {
    type: string,
    access_token: string
}

export type MessageCode = {
    code: number,
    message: string,
}

export type ApiDataUser = {
    id:string,
    email: string,
    faceUrl: string,
    twiUrl: string,
    username: string,
    youUrl: string,
    avatar: string | File
};

export type UserData = {
    id:string,
    createdAt: string,
    updatedAt: string,
    role:string,
    avatar: string |File,
    faceUrl:string,
    twiUrl:string,
    youUrl:string,
    username:string,
    email:string 
}

type UserApi = {
    code: number,
    message: string,
    users:UserData
}

export type UserCurrent = {
    data:UserApi,
}

export type Login = {
    code: number,
    message: string,
    access_token: string
}

export type DataResponse = {
    data: MessageCode,
}

export type DataLogin = {
    data: Login
}

export type LoginRedux = {
    type: string;
    access_token: string;
}

export type ImgApi = [{
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string
}]


export type DataMessBanner = {
    code: number,
    message: string,
    banners: ImgApi
}

export type DataResBanner = {
    data: DataMessBanner
}

export type ImageType = {
    image: string
}