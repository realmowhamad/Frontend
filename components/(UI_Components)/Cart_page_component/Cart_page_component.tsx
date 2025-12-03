import UseAuth from "@/hooks/useAuth/useAuth";
import useCart from "@/hooks/useCart/useCart";
import UsePayment from "@/hooks/usePayment/usePayment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaShippingFast, FaWhatsapp } from "react-icons/fa";
import { FaGift, FaMinus, FaPhone, FaPlus, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const CartPage: React.FC = () => {
  const { myDetailsData } = UseAuth().useGetMyDetails()
  const { myCartData, refetchMyCart } = useCart().useGetMyCart()
  const { useUpdateCart, useRemoveFromCart } = useCart()
  const [customerNote, setCustomerNote] = useState<string>('')
  const router = useRouter()
  const [confirmedChekout, setConfirmedCheckout] = useState<boolean>(false)

  const { clientSecretData, clientSecretRefetch, clientSecretError } = UsePayment().useGetClientSecret(confirmedChekout, customerNote)




  useEffect(() => {
    console.log(clientSecretError)
    if (confirmedChekout) {

      // Check if the client secret is available
      if (clientSecretData?.clientSecret) {
        // Redirect after a delay if no client secret is found
        const redirectTimeout = setTimeout(() => {
          router.push(`/payment?csid=${clientSecretData?.clientSecret}`);
          setConfirmedCheckout(false); // Reset checkout state
        }, 2000);

        // Cleanup timeout if the component unmounts
        return () => clearTimeout(redirectTimeout);
      }
    } else {
      setConfirmedCheckout(false); // Reset checkout state
      clientSecretRefetch() // Fetch new client secret if it's expired
    }

  }, [confirmedChekout])



  const checkoutBtnHandler = () => {
    setConfirmedCheckout(true)
  }




  const removeItemHandler = (foodId: string) => {
    useRemoveFromCart.mutate(foodId, {
      onSuccess: () => {
        refetchMyCart();
        toast.success('item removed from cart successfully')
      },
      onError: (error: any) => {
        toast.error('Failed to remove item from cart')
        console.error(error)
      }
    })
  }


  const QuantityHandler = (isIncrease: boolean, foodId: string, currentQty: number) => {
    const newQty = isIncrease ? currentQty + 1 : currentQty - 1;

    useUpdateCart.mutate({ foodId, quantity: newQty }, {
      onSuccess: () => {
        refetchMyCart();
        toast.success('your cart updated successfully')
      },
      onError: (error: any) => {
        toast.error('Failed to update your cart')
        console.error(error)
      }
    });
  };


  if (!myDetailsData) return <p>Login</p>
  if (myCartData?.data?.cart?.cartItems?.length < 1) return (
    <div className="w-screen h-screen flex flex-col space-y-4 items-center justify-center">

      <p>Your basket is waiting for your picks</p>
      <Link href='/menu' className="bg-black p-3 text-white rounded-lg py-2">See Menu</Link>
    </div>
  )


  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shopping Bag Section */}
        <div className="lg:col-span-2">
          <span className="flex gap-4 items-center mb-4">
            <h1 className="text-2xl font-semibold ">Order details</h1>
            <p className="text-sm text-gray-500">{myCartData?.data?.cart?.cartItems?.length} items in your bag.</p>
          </span>
          <div className="space-y-4">
            {/* Product Item */}
            {myCartData?.data?.cart?.cartItems?.map((item: any) => (

              <div key={item._id} className="flex justify-between items-start py-4 max-h-max bg-white shadow-md rounded-lg md:min-h-28 lg:p-4 p-2 border-gray-200">
                <div className='md:flex-[0_0_auto] mr-1'>
                  <Image
                    src={'/images/ghafghazi.webp'}
                    alt={item?.food?.title}
                    className="w-20 h-20 object-cover rounded-md"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col flex-[1_0_60%] w-full items-start">
                  <span className='flex items-center justify-start '>

                    <p className={` text-lg font-bold text-primary-400 mr-1`}>{item?.quantity}x</p>
                    <h3 className="text-xl  flex-[0_0_auto] font-bold font-notoSans ">{item?.food?.title}</h3>
                  </span>
                  {/* <span className="border-t border-dotted border-gray-300 h-[1px] mx-2 block w-full flex-grow"></span> */}
                  <p className="text-sm text-gray-500 mt-1">{item?.food?.desc}</p>
                  <span className="flex items-center justify-center gap-2">
                    <p className="text-primary-400 font-bold">£{item?.price.toFixed(2)}</p>
                    <p className="text-gray-400">£{item?.food?.price.toFixed(2)}</p>
                  </span>
                </div>



                <div className='flex items-center justify-center w-full  flex-[0_0_7%] h-full'>

                  <span className='h-full flex items-center justify-center gap-1 flex-col'>
                    <button
                      type="button"
                      onClick={() => QuantityHandler(true, item?.food?._id, item?.quantity)}
                      className='flex h-full items-center justify-center mt-auto gap-1 border text-primary-400 border-primary-400 hover:bg-primary-500 p-1  transition-all hover:text-white '>
                      {<FaPlus />}
                    </button>
                    {item.quantity > 1 &&
                      <button
                        type="button"
                        onClick={() => QuantityHandler(false, item?.food?._id, item?.quantity)}
                        className='flex h-full items-center justify-center mt-auto gap-1 border text-primary-400 border-primary-400 hover:bg-primary-500 p-1  transition-all hover:text-white '>
                        {<FaMinus />}
                      </button>
                    }
                    <button
                      type="button"
                      onClick={() => removeItemHandler(item?.food?._id)}
                      className='flex h-full items-center justify-center mt-auto gap-1 border text-primary-400 border-primary-400 hover:bg-primary-500 p-1  transition-all hover:text-white '>
                      {<FaTrash />}
                    </button>

                  </span>


                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Order Method</h2>
            <div className="space-y-3">

              <p className="w-full border rounded-lg p-2 text-sm bg-gray-100">{myDetailsData?.data?.user?.fullName}</p>
              <p className="w-full border rounded-lg p-2 text-sm bg-gray-100">{myDetailsData?.data?.user?.phoneNumber}</p>

              <span className="flex items-center justify-start gap-3">
                <label htmlFor="takeaway" className="flex gap-2">
                  <input type="radio" name="" id="takeaway" defaultChecked />
                  Collection
                </label>
                <label htmlFor="delivery" className="flex gap-2">
                  <input type="radio" name="" id="delivery" disabled checked={false} />
                  Delivery
                </label>
              </span>
              <textarea value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} className="border  w-full rounded-lg min-h-32 p-2" placeholder="Feel free to add any extra information or special requests for your order here" />
              <p className="text-xs">Delivery unavailable. Please order via
                <Link aria-label='deliveroo' href="https://deliveroo.co.uk/menu/London/kingston/narenj?geohash=gcpu2yxfm37z" className="text-primary-400 mx-1 font-bold hover:text-primary-600">
                  Deliveroo
                </Link>
                or
                <Link href="tel:+442085493333" aria-label='phone' className="text-primary-400 mx-1 font-bold hover:text-primary-600">
                  Call
                </Link>
                us directly</p>

            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
            <div className="flex justify-between mb-2">
              <span>Cart Subtotal</span>
              <span>£{myCartData?.data?.cart?.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span className="text-red-500">(10%) - £{((myCartData?.data?.cart?.totalPrice * 10) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Cart Total</span>
              <span>£{(myCartData?.data?.cart?.totalPrice - (myCartData?.data?.cart?.totalPrice * 10) / 100).toFixed(2)}</span>
            </div>
            <button onClick={checkoutBtnHandler} className="w-full bg-primary-400 text-white rounded-lg p-2 mt-4">
              {confirmedChekout ? "Loading ... " : "Checkout"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="flex flex-wrap justify-around mt-8 space-y-4 md:space-y-0">
        {[
          { text: "Free Delivery", sub: "When you spend £50+", icon: <FaShippingFast /> },
          { text: "Call Us Anytime", sub: "+44 20 8549 3333", icon: <FaPhone /> },
          { text: "Chat With Us", sub: "+44 74 0296 3339", icon: <FaWhatsapp /> },
          { text: "Gift Cards", sub: "For your loved ones", icon: <FaGift /> },
        ].map((info, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow-md rounded-lg p-4 w-full md:w-1/5"
          >
            <div className="text-3xl mr-4 text-primary-400">{info.icon}</div>
            <div>
              <p className="font-semibold">{info.text}</p>
              <p className="text-sm text-gray-500">{info.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
