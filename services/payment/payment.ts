import AxiosConfigInstansce from "@/config/axios/AxiosConfig";


export interface PaymentIntentDataInterface {
    status: string,
    message: string,
    clientSecret: string
}

export const createPaymentIntent =(customerNote?:string)=> {
    return AxiosConfigInstansce({
        method:"POST",
        url:"/payments/create-payment-intent",
        data:{
            orderType:"collection",
            note:customerNote
        }
    })
}
