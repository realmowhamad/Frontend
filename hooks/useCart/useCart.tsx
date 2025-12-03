import services from '@/services/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

function useCart() {

    const useAddToCart = useMutation({
        mutationKey: ['addToCart'],
        mutationFn: async (foodId: string) => {
            // call the add to cart API
            const response = await services.cart.addToCartfn(foodId)
            return response.data
        }
    })
    const useRemoveFromCart = useMutation({
        mutationKey: ['removeFromCart'],
        mutationFn: async (foodId: string) => {
            // call the add to cart API
            const response = await services.cart.removeFromCartfn(foodId)
            return response.data
        }
    })
    const useUpdateCart = useMutation({
        mutationKey: ['updateCart'],
        mutationFn: async ({ foodId, quantity }: { foodId: string, quantity: number }) => {
            const response = await services.cart.updateCartfn(foodId, quantity)
            return response.data
        }
    })

    const useGetMyCart = (enabledFetchCart: boolean = false) => {
        const { data: myCartData, refetch: refetchMyCart } = useQuery({
            queryKey: ['myCart'],
            queryFn: async () => {
                // call the get my cart API
                const response = await services.cart.getMyCartFn()
                return response.data;
            },
            enabled: enabledFetchCart,

        })
        return { myCartData, refetchMyCart }
    }



    return { useAddToCart, useRemoveFromCart, useUpdateCart, useGetMyCart }
}

export default useCart