import AxiosConfigInstansce from "@/config/axios/AxiosConfig";
const url = "/foods";

export const getAllFoodsFn = () => {
  return AxiosConfigInstansce({
    method: "GET",
    url: url,
    params:{
      limit:1000
    }
  });
};

export const getFoodByCategoryFn = (categoryId: string) => {
  return AxiosConfigInstansce({
    method: "GET",
    url: `categories/${categoryId}/foods`,
  });
};
