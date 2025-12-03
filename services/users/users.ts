import AxiosConfigInstansce from "@/config/axios/AxiosConfig";

export interface SignupUserByAdmin {
  fullName: string;
  phoneNumber: number;
  address: {
    province: "london";
    city: "london";
    address: string;
    postCode: string;
  };
}

export const getAllUsersFn = () => {
  return AxiosConfigInstansce({
    method: "GET",
    url: "/users",
  });
};
export const getSingleUsersFn = (userId: string) => {
  return AxiosConfigInstansce({
    method: "GET",
    url: `/users/${userId}`,
  });
};
export const deleteUserFn = (userId: string) => {
  return AxiosConfigInstansce({
    method: "DELETE",
    url: `/users/${userId}`,
  });
};

export const createUserFn = (userData: SignupUserByAdmin) => {
    return AxiosConfigInstansce({
    method: "POST",
    url: "/users",
    data: userData,
  });
};
