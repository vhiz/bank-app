export interface User{
    _id?:string
    username: string;
    password: string;
    email: string;
    isAdmin?: boolean,
    tokenId: string
}