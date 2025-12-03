import { UserLoginDataInterface, UserRegisterDataInterface } from '@/services/auth/auth';
import services from '@/services/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { deleteCookie } from 'cookies-next'

const UseAuth = () => {
    const useUserLogin = useMutation({
        mutationKey: ['login'],
        mutationFn: async ({ password, phoneNumber }: UserLoginDataInterface) => {
            const response = await services.auth.userLoginFn({ password, phoneNumber })
            return response.data

        },

    })
    const useUserRegister = useMutation({
        mutationKey: ['user register'],
        mutationFn: async (registerUserData: UserRegisterDataInterface) => {
            const response = await services.auth.userRegisterFn(registerUserData)
            return response.data

        },

    })
    const useUserLogout = useMutation({
        mutationKey: ['logout'], // Change the mutationKey to 'logout' for clarity
        mutationFn: async () => {
            const response = await services.auth.userLogoutFn();
            return response.data;
        },
        onSuccess: () => { // Fix the arrow function syntax here
            deleteCookie('access');
            deleteCookie('jwt');
            window.location.href = '/'

            alert("You have logged out successfully")
        },
    });

    const useGetMyDetails = () => {
        const { data: myDetailsData, isLoading: myDetailsIsLoading, isSuccess: myDetailsIsSuccess, refetch: myDetailsRefetch } = useQuery({
            queryKey: ['myDetails'],
            queryFn: async () => {
                const response = await services.auth.getMyDetailsFn()
                return response.data
            },
        })
        return { myDetailsData, myDetailsIsLoading, myDetailsIsSuccess, myDetailsRefetch }
    }

    return { useUserLogin, useUserLogout, useUserRegister, useGetMyDetails }

}

export default UseAuth;
