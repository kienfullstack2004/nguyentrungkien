export type RegisterType = {
    email: string,
    password:string,
    username: string   
}

export type LoginType = {
    email: string,
    password:string
}

export type ActionAuth = {
   type: string,
   access_token: string  
}