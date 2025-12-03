import services from '@/services/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function useUsers() {

    const useGetAllUsers = () => {
        const { data: allUsersData, isLoading: allUsersIsLoading, isSuccess: allUsersIsSuccess, refetch: allUsersRefetch } = useQuery({
            queryKey: ['allUsers'],
            queryFn: async () => {
                const response = await services.users.getAllUsersFn()
                return response.data
            }
        })
        return { allUsersData, allUsersIsLoading, allUsersIsSuccess, allUsersRefetch }
    }





    return { useGetAllUsers }





}

export default useUsers