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
    id: string,
    email: string,
    faceUrl: string,
    twiUrl: string,
    username: string,
    youUrl: string,
    avatar: string | File
};

export type UserData = {
    id: string,
    createdAt: string,
    updatedAt: string,
    role: string,
    avatar: string | File,
    faceUrl: string,
    twiUrl: string,
    youUrl: string,
    username: string,
    email: string
}

type UserApi = {
    code: number,
    message: string,
    users: UserData
}

export type UserCurrent = {
    data: UserApi,
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

export type DataType = [{
    id: string,
    title: string,
    dess: string,
    desshort: string,
    image: string,
    createdAt: string,
    updatedAt: string,
}]

export type DataApiPost = {
    id: string,
    title: string,
    dess: string,
    desshort: string,
    userdetail: { username: string }
    image: string,
    createdAt: string,
    updatedAt: string
}

export type DataApiRes = {
    code: number,
    message: string,
    news: DataApiPost
}

export type DataResApi = {
    data: DataApiRes
}

export type DataApiResponse = [
    {
        id: string,
        title: string,
        dess: string,
        desshort: string,
        userdetail: { username: string }
        image: string,
        createdAt: string,
        updatedAt: string
    }
]

export type DataNews = {
    code: number,
    message: string,
    news: DataType
}
export type DataNewsPost = {
    code: number,
    message: string,
    news: DataApiResponse
}

export type ApiRes = {
    data: DataNews
}
export type ApiResNew = {
    data: DataNewsPost
}

export type DataApi = [
    {
        id: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        dess: string,
        desshort: string,
        image: string
    }
]

export type DataTypeNew = {
    code: number,
    message: string,
    news: DataApi
}

export type DataRes = {
    code: number,
    message: string,
    news: DataApiResponse
}

export type DataResponsive = {
    data: DataTypeNew
}

export type DataResponsiveNew = {
    data: DataRes
}

export type CommentType = [{
    createdAt: string,
    message: string,
    userComment: { avatar: string, username: string },
}]

export type DataComment = {
    code: number,
    message: string,
    comment: CommentType
}

export type DataComments = {
    data: DataComment
}

export type YoutubeType = {
    code: number,
    type: string
}

export type YoutubeData = [
    {
        code: string,
        log: string,
        type: string
    }
]

export type YoutubeTypeData = {
    code: number,
    message: string,
    ytbs: YoutubeData
}

export type ApiYoutubeCreate = {
    data: YoutubeTypeData
}


export type DataTypePost = [
    {
        id: string,
        image: string,
        title: string,
        dess: string,
        desshort: string,
        createdAt: string,
        updatedAt: string
    }
]

export type DataApiPostRes = {
    code: number,
    message: string,
    courses: DataTypePost
}

export type DataResponseRes = {
    data:DataApiPostRes
}

export type DataTypeCourses = [
    {
        id: string,
        image: string,
        title: string,
        desshort: string,
        price: string,
        price_sale: string,
        createdAt:string,
        updatedAt:string	
    }
]
 
export type DataApiCourses = {
    code:number,
    message:string,
    courses:DataTypeCourses
}

export type DataResponsiveCourses = {
    data:DataApiCourses
}