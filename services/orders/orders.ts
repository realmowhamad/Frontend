import AxiosConfigInstansce from "@/config/axios/AxiosConfig";

export interface UpdateOrdersInterface {
  status?: string;
  statusPayments?: string;
  orderMethod?: string;
  orderType?: string;
}

export const getAllOrdersFn = (status?:string) => {
  const params = status ? { status } : undefined;
  return AxiosConfigInstansce({
    method: "GET",
    url: "/orders",
    params
  });
};
export const getSingleOrderFn = (orderId: string) => {
  return AxiosConfigInstansce({
    method: "GET",
    url: `/orders/${orderId}`,
  });
};
export const updateOrderFn = (orderId: string, data?: UpdateOrdersInterface) => {
  return AxiosConfigInstansce({
    method: "PATCH",
    url: `/orders/${orderId}`,
    data,
  });
};

export const getMyOrdersFn = () => {
  return AxiosConfigInstansce({
    method: "GET",
    url: "/orders/myOrders",
  });
};
export const getMySingleOrderFn = (orderId: string) => {
  return AxiosConfigInstansce({
    method: "GET",
    url: `/orders/myOrder/${orderId}`,
  });
};


export const deleteOrderFn = (orderId: string) => {
    return AxiosConfigInstansce({
    method: "DELETE",
    url: `/orders/${orderId}`,
  });
}
