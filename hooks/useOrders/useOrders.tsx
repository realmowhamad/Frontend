import { UpdateOrdersInterface } from '@/services/orders/orders'
import services from '@/services/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

function useOrders() {
    const useGetAllOrders = (status?:string) => {
        const { data: allOrdersData, refetch: refetchAllOrders } = useQuery({
            queryKey: ['allOrders',status],
            queryFn: async () => {
                // call the get all orders API
                const response = await services.orders.getAllOrdersFn(status)
                return response.data
            }
        })
        return { allOrdersData, refetchAllOrders }
    }

    const useGetSingleOrder = (orderId: string) => {
        const { data: singleOrderData, isLoading: singleOrderIsLoading, isSuccess: singleOrderIsSuccess, refetch: refetchSingleOrder, error: singleOrderError } = useQuery({
            queryKey: ['singleOrder', orderId],
            queryFn: async () => {
                // call the get single order API
                const response = await services.orders.getSingleOrderFn(orderId)
                return response.data
            }
        })
        return { singleOrderData, singleOrderIsLoading, singleOrderIsSuccess, refetchSingleOrder, singleOrderError }
    }

    const useGetMyOrders = () => {
        const { data: myOrdersData, isLoading: myOrdersIsLoading, isSuccess: myOrdersIsSuccess, refetch: refetchMyOrders, error: myOrdersError } = useQuery({
            queryKey: ['myOrders'],
            queryFn: async () => {
                // call the get my orders API
                const response = await services.orders.getMyOrdersFn()
                return response.data
            }
        })
        return { myOrdersData, myOrdersIsLoading, myOrdersIsSuccess, refetchMyOrders, myOrdersError }
    }

    const useGetMySingleOrders = (orderId: string) => {
        const { data: mySingleOrderData, isLoading: mySingleOrderIsLoading, isSuccess: mySingleOrderIsSuccess, refetch: refetchMySingleOrder, error: mySingleOrderError } = useQuery({
            queryKey: ['mySingleOrder', orderId],
            queryFn: async () => {
                // call the get my single order API
                const response = await services.orders.getMySingleOrderFn(orderId)
                return response.data
            }
        })
        return { mySingleOrderData, mySingleOrderIsLoading, mySingleOrderIsSuccess, refetchMySingleOrder, mySingleOrderError }
    }
    const useUpdateOrderByAdmin = useMutation({
        mutationKey: ['updateOrderStatus'],
        mutationFn: async (orderId: string, data?: UpdateOrdersInterface) => {
            const response = await services.orders.updateOrderFn(orderId, data);
            return response.data;
        },

    })

    const useDeleteOrder = useMutation({
        mutationKey: ['deleteOrder'],
        mutationFn: async (orderId: string) => {
            const response = await services.orders.deleteOrderFn(orderId);
            return response.data;
        },
    })


    return { useGetAllOrders,useDeleteOrder, useGetSingleOrder, useGetMyOrders, useGetMySingleOrders, useUpdateOrderByAdmin }

}

export default useOrders