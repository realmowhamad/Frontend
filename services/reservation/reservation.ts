import AxiosConfigInstansce from "@/config/axios/AxiosConfig";

export interface reservationByUserDataInterface {
  phoneNumber: string | number;
  email: string;
  date: string;
  peopleCount: number;
}


export interface reservationByGuestDataInterface {
  fullName: string;
  phoneNumber: string | number;
  email: string;
  date: string;
  peopleCount: number;
}


export const reserveByGuestFn = (
  reservationData: reservationByGuestDataInterface
) => {
  return AxiosConfigInstansce({
    method: "POST",
    url: "/guest-reservations",
    data: reservationData,
  });
};

export const getAllGuestFn = () => {
  return AxiosConfigInstansce({
    method: "GET",
    url: "/guest-reservations",
  });
};


export const reserveByUserFn = (
  reservationData: reservationByUserDataInterface
) => {
  return AxiosConfigInstansce({
    method: "POST",
    url: "/reservations/public",
    data: reservationData,
  });
};

export const getAllReservationFn = (
  page?: number,
  limit?: number,
  status?: string
) => {
  return AxiosConfigInstansce({
    method: "GET",
    url: "/reservations",
    params: {
      page,   // Send the page number
      limit,  // Send the number of items per page
      ...(status && { status }) // Only include status if it's provided
    },
  });
};

export const getSingleReservationFn = (id: string) => {
  return AxiosConfigInstansce({
    method: "GET",
    url: `/reservations/${id}`,
  });
};

export const updateReserveByAdmin = ({
  reservId,
  status,
}: {
  reservId: string;
  status: "accepted" | "rejected";
}) => {
  return AxiosConfigInstansce({
    method: "PATCH",
    url: `/reservations/${reservId}`,
    data: { status },
  });
};
