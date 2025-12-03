


import services from '@/services/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UsePayment = () => {

    const useGetClientSecret = (enableClientSecret: boolean, customerNote?: string) => {
        const { data: clientSecretData, refetch: clientSecretRefetch, error: clientSecretError } = useQuery({
            queryKey: ['getClientSecret'],
            queryFn: async () => {
                const response = await services.payments.createPaymentIntent(customerNote)
                return response.data
            },
        })
        return { clientSecretData, clientSecretRefetch, clientSecretError }
    }

    return { useGetClientSecret }

}

export default UsePayment;
