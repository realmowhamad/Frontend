import { reservationByGuestDataInterface, reservationByUserDataInterface } from "@/services/reservation/reservation";
import services from "@/services/services";
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios";


export interface Reservation {

    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    date: string;
    peopleCount: number;
    status: string;
    createdAt: string;
}

export interface ReservationData {
    status: string;
    message: string;
    data: {
        amount: number;
        reservations: Reservation[];
    };
}





const useReservation = () => {

    const useReserveByUser = useMutation({
        mutationKey: ["ReserveTableByUser"],
        mutationFn: async (reservationData: reservationByUserDataInterface) => {
            const response = await services.reservation.reserveByUserFn(reservationData)
            return response.data
        }
    })

    const useReserveByGuest = useMutation({
        mutationKey: ["ReserveTableByGuest"],
        mutationFn: async (reservationData: reservationByGuestDataInterface) => {
            const response: AxiosResponse<ReservationData> = await services.reservation.reserveByGuestFn(reservationData)
            return response.data
        }
    })

    const useGetAllGuest = () => {
        const { data: AllGuestData, refetch: refetchAllGuest } = useQuery({
            queryKey: ['getAllGuest'],
            queryFn: async () => {
                const response = await services.reservation.getAllGuestFn()
                return response.data
            }
        })
        return { AllGuestData, refetchAllGuest }
    }

    const useGetAllReservation = (page?: number, limit?: number, status?: string) => {
        const { data: AllReservationData, refetch: refetchAllReservation } = useQuery({
            queryKey: ['getAllReservation', page, limit],
            queryFn: async () => {
                const response = await services.reservation.getAllReservationFn(page, limit, status)
                return response.data
            }
        })
        return { AllReservationData, refetchAllReservation }
    }
    const useGetSingleReservation = (id: string) => {
        const { data: singleReservation, refetch: refetchSingleOrder } = useQuery({
            queryKey: ['getAllReservation'],
            queryFn: async () => {
                const response = await services.reservation.getSingleReservationFn(id)
                return response.data
            }
        })
        return { singleReservation, refetchSingleOrder }
    }

    const useUpdateUserByAdmin = useMutation({
        mutationKey: ["ReserveTableByUser"],
        mutationFn: async ({ reservId, status }: {
            reservId: string;
            status: "accepted" | "rejected";
        }) => {
            const response = await services.reservation.updateReserveByAdmin({ reservId, status })
            return response.data
        }
    })














        return {useReserveByGuest, useGetAllGuest, useReserveByUser, useGetAllReservation, useUpdateUserByAdmin, useGetSingleReservation }

}

export default useReservation