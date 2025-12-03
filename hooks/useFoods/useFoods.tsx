import { useQuery } from '@tanstack/react-query';
import services from '@/services/services';

interface Food {
    id: string;
    name: string;
    // Add other fields
}

const useFoods = () => {
    const getAllFoods = () => {
        const { data: allFoodsData, isLoading: allFoodsIsLoading, isSuccess: allFoodsIsSuccess, refetch: refetchAllFoods, error: allFoodsError } = useQuery({
            queryKey: ["allfoods"],
            queryFn: async () => {
                const response = await services.foods.getAllFoodsFn();
                return response.data;
            },
        });

        return { allFoodsData, allFoodsIsLoading, allFoodsIsSuccess, refetchAllFoods, allFoodsError };
    }


    const getFoodByCategory = (categoryId: string) => {
        const { data: foodByCategoryData, isLoading: foodByCategoryIsLoading, isSuccess: foodByCategoryIsSuccess, refetch: refetchfoodByCategory, error: foodByCategoryError } = useQuery({
            queryKey: ["foodByCategory", categoryId],
            queryFn: async () => {
                const response = await services.foods.getFoodByCategoryFn(categoryId);
                return response.data;
            },
        });

        return { foodByCategoryData, foodByCategoryIsLoading, foodByCategoryIsSuccess, refetchfoodByCategory, foodByCategoryError };
    }





    return { getAllFoods }
}

export default useFoods;
