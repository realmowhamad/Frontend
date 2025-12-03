import services from '@/services/services'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function useCategories() {
    const getAllCategories = ()=>{
        const{data:allCategoriesData,isLoading:allCategoriesIsLoading,isSuccess:allCategoriesIsSuccess,refetch:allCategoriesRefetch}=useQuery({
            queryKey:['allCategories'],
            queryFn:async()=>{
                const response = await services.categories.getAllCategoriesFn()
                return response.data
            }
        })
        return {allCategoriesData,allCategoriesIsLoading,allCategoriesIsSuccess}
    }




    return{getAllCategories}
}

export default useCategories