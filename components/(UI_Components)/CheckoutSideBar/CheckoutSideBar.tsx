import UseAuth from '@/hooks/useAuth/useAuth'
import useCart from '@/hooks/useCart/useCart'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6'
import { toast } from 'react-toastify'

function CheckoutSideBar() {
  const [fetchCart, setFetchCart] = useState(false)

  const { myCartData, refetchMyCart } = useCart().useGetMyCart(fetchCart)
  const { myDetailsData } = UseAuth().useGetMyDetails()
  const { useUpdateCart, useRemoveFromCart } = useCart()
  const [disabledCheckout, setDisabledCheckout] = React.useState(true)

  React.useEffect(() => {
    if (myCartData?.data?.cart?.cartItems?.length > 0 && myDetailsData?.data?.user?.addresses?.length > 0) {
      setDisabledCheckout(false);
      setFetchCart(true);
    } else {
      setDisabledCheckout(true);
    }

  }, [myCartData?.data, myDetailsData?.data])


  const updateCartHandler = (foodId: string, currentQuantity: number, isIncrease: boolean) => {
    const updatedQuantity = isIncrease ? currentQuantity + 1 : currentQuantity - 1;

    useUpdateCart.mutate(
      { foodId, quantity: updatedQuantity },
      {
        onSuccess: () => {
          refetchMyCart();
          toast.success("Cart updated successfully!");
        },
      }
    );

  };

  const removeFromCartHandler = (foodId: string) => {
    useRemoveFromCart.mutate(foodId, {
      onSuccess: () => {
        refetchMyCart();
        toast.success("Item removed from cart successfully!");
      },
    });
  }



  return (
    <div className='p-3 w-full min-h-full flex-col items-start justify-start bg-gray-100 rounded-md  h-auto hidden lg:flex lg:flex-col '>
      {myDetailsData?.data?.user ? (

        <div className='border border-primary-400 w-full rounded-md h-max p-3'>
          <span className='flex items-center justify-between'>
            <h2 className='font-bold text-primary-400'>{myDetailsData?.data?.user?.fullName}</h2>
            <h3 className='font-bold text-primary-400'>{myDetailsData?.data?.user?.phoneNumber}</h3>
          </span>
          {myDetailsData?.data?.user?.addresses[0] && (
            <>
              <h1 className='text-sm'>{myDetailsData?.data?.user?.addresses[0]?.address}</h1>
              <p className='uppercase text-sm'>{myDetailsData?.data?.user?.addresses[0]?.postCode}</p>
            </>
          )}
          <button type='button' className={`${myDetailsData?.data?.user?.addresses[0] ? "bg-gray-200 hover:bg-primary-400" : "bg-primary-400 hover:bg-primary-600"} mx-auto text-white px-2 rounded-lg py-1 transition-all `} >{myDetailsData?.data?.user?.addresses[0] ? "Update Address" : "Add Address"}</button>


        </div>
      ) : (
        <div className='border border-primary-400 w-full rounded-md h-max p-3'>
          <h2 className='font-bold text-primary-400'>Please sign in to see your Details</h2>
          <button type='button' className='w-full bg-primary-400 text-white py-2 rounded-lg hover:bg-primary-600 transition-all'>Sign In</button>
        </div>
      )
      }


      {myCartData?.data?.cart?.cartItems?.map((item: any) => (
        <div key={item._id} className='flex items-center justify-between w-full gap-4 p-2 border-b'>
          <Image src={'/images/ghafghazi.webp'} alt={item.food.title} width={50} height={50} />
          <span className='flex flex-col'>
            <p className='flex-1 font-bold text-primary-400 '>{item?.food?.title}</p>
            <p className='text-[10px] text-gray-400 '>{item?.food?.desc}</p>
          </span>
          <span className='flex items-center justify-center gap-1'>
            <i onClick={() => updateCartHandler(item?.food?._id, item.quantity, false)} className='cursor-pointer hover:text-primary-400 transition-all'>{<FaMinus />}</i>
            <p className='font-bold'>{item?.quantity}</p>
            <i onClick={() => updateCartHandler(item?.food?._id, item.quantity, true)} className='cursor-pointer hover:text-primary-400 transition-all'>{<FaPlus />}</i>
          </span>
          <p className='font-bold text-primary-400 '>£{item?.food?.price?.toFixed(2)}</p>
          <i onClick={() => removeFromCartHandler(item?.food?._id)} className='cursor-pointer text-sm text-gray-400 hover:text-rose-600 transition-all'>{<FaTrash />}</i>

        </div>
      ))}

      <div className='flex justify-between w-full gap-4 p-2 border-b'>
        <p className='text-lg font-bold text-primary-400'>Total:</p>
        <p className='font-bold text-primary-400'>£{myCartData?.data?.cart?.totalPrice?.toFixed(2)}</p>
      </div>
      <button disabled={disabledCheckout} className={`${disabledCheckout ? "bg-gray-100 hover:bg-gray-400" : "bg-green-500 hover:bg-green-600"} w-full  text-white py-2 rounded-lg  transition-colors`}>Checkout</button>
    </div>
  )
}



export default CheckoutSideBar