import UseAuth from '@/hooks/useAuth/useAuth'
import useCart from '@/hooks/useCart/useCart'
import { useRouter } from 'next/router'
import { useState } from 'react'

function BottomBar() {

    const router = useRouter()
    const [fetchCart, setFetchCart] = useState(false)
    const { myDetailsData } = UseAuth().useGetMyDetails()
    const { myCartData, refetchMyCart } = useCart().useGetMyCart(fetchCart)



    const showCondition = myDetailsData && router.pathname !== '/dashboard' && router.pathname !== '/cart' && router.pathname !== '/checkout'





    return (
        <>
            {/* Bottom Floating Bar */}
            <div
                onClick={() => router.push('/cart')}
                className={`${!showCondition && 'hidden'} w-full h-12 bg-primary-400 text-white fixed bottom-0 cursor-pointer font-bold flex items-center justify-evenly md:justify-center z-40 md:gap-8`}
            >
                <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
                    <p className="text-primary-400 text-sm">{myCartData?.data?.cart?.cartItems?.length}</p>
                </span>
                <p className="block">Checkout</p>
                <p>£{myCartData?.data?.cart?.totalPrice?.toFixed(2)}</p>
            </div>

        </>
    );
}

export default BottomBar;
