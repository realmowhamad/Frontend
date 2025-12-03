import AxiosConfigInstansce from "@/config/axios/AxiosConfig";

export interface UserLoginDataInterface {
  phoneNumber: string;
  password: string;
}

export interface UserRegisterDataInterface {
  fullName: string;
  confirmPassword: string;
  phoneNumber: string;
  password: string;
}

export const userLoginFn = ({
  password,
  phoneNumber,
}: UserLoginDataInterface) => {
  return AxiosConfigInstansce({
    method: "POST",
    url: "/auth/login",
    data: {
      phoneNumber,
      password,
    },
  });
};
export const userRegisterFn = (registerData: UserRegisterDataInterface) => {
  // Map the fields correctly for the backend

  const dataWithPasswordConfirm = {
    ...registerData,
    passwordConfirm: registerData.password, // Use `passwordConfirm` as expected by the backend
  };

  return AxiosConfigInstansce({
    method: "POST",
    url: "/auth/signup",
    data: dataWithPasswordConfirm, // Correct field name
  });
};

export const userLogoutFn = () => {
  return AxiosConfigInstansce({
    method: "POST",
    url: "/auth/logout",
  });
};

export const getMyDetailsFn = () => {
  return AxiosConfigInstansce({
    method: "GET",
    url: "/users/me",
  });
};
