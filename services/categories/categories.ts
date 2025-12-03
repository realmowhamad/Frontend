import AxiosConfigInstansce from "@/config/axios/AxiosConfig"
export interface CategoryInterface {
    _id:string,
    name:string,
    createdAt:string,
    
}


export const getAllCategoriesFn =()=>{
    return AxiosConfigInstansce({
        method:"GET",
        url:"/categories"
    })
}