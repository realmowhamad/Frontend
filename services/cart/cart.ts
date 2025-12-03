import AxiosConfigInstansce from "@/config/axios/AxiosConfig";

export const addToCartfn = (foodId: string) => {
  return AxiosConfigInstansce({
    method: "POST",
    url: `/foods/${foodId}/cartItems`,
    data: { quantity: 1 },
  });
};
export const updateCartfn = (foodId: string, quantity: number) => {
  return AxiosConfigInstansce({
    method: "PATCH",
    url: `/foods/${foodId}/cartItems`,
    data: { quantity },
  });
};

export const removeFromCartfn = (foodId: string) => {
  return AxiosConfigInstansce({
    method: "DELETE",
    url: `/foods/${foodId}/cartItems`,
  });
};
export const getMyCartFn = () => {
  return AxiosConfigInstansce({
    method: "GET",
    url: `/users/me/carts`,
  });
};
export const getSingleCartFn = (cartId: string) => {
  return AxiosConfigInstansce({
    method: "DELETE",
    url: `/carts/${cartId}`,
  });
};


