/**
 * MenuPageComponent - Displays restaurant menu with categorized food items
 * Allows users to browse, filter, and manage cart items
 */

import { FoodInterface } from '@/components/(Elements)/FoodCart/FoodCart'
import { useModal } from '@/context/ModalContext/ModalContext'
import useCart from '@/hooks/useCart/useCart'
import useFoods from '@/hooks/useFoods/useFoods'
import Image from 'next/image'
import Link from 'next/link'
import { FaMinus } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'react-toastify'

function MenuPageComponent() {
  // Image configuration
  const backendImageUrl = 'https://api.persianriverside.co.uk/images/foods'
  const defaultBackendImage = "default-food.jpg"

  // Data hooks
  const { allFoodsData } = useFoods().getAllFoods()
  const { useAddToCart, useRemoveFromCart, useUpdateCart, useGetMyCart } = useCart()
  const { refetchMyCart, myCartData } = useGetMyCart()
  const { openModalHandler } = useModal()

  // Filter categories configuration
  const filterValues = [
    { id: 1, imageUrl: "/images/2.jpg", title: "Starters", filterCategoryValue: "starter" },
    { id: 2, imageUrl: "/images/MixGr.jpg", title: "Mix Grills", filterCategoryValue: "mix grill" },
    { id: 3, imageUrl: "/images/MainCourses.jpg", title: "Main Course", filterCategoryValue: "main course" },
    { id: 4, imageUrl: "/images/Ghormeh-Sabzi_5.jpg", title: "Special & Stew", filterCategoryValue: "special & stew" },
    { id: 7, imageUrl: "/images/Narenj_Outside.jpg", title: "Sides", filterCategoryValue: "Sides" },
    { id: 5, imageUrl: "/images/Dessert.webp", title: "Desserts", filterCategoryValue: "dessert" },
    { id: 6, imageUrl: "/images/wine.avif", title: "Drinks", filterCategoryValue: "drink" },
  ]

  /**
   * Checks if a food item exists in the cart
   * @param foodId - ID of the food item to check
   * @returns Boolean indicating existence in cart
   */
  const findCartItemAvailabe = (foodId: string) => {
    return myCartData?.data?.cart?.cartItems.some((item: any) => item?.food?._id === foodId)
  }

  /**
   * Handles quantity changes for cart items
   * @param isIncrease - Direction of quantity change
   * @param foodId - ID of the food item to modify
   */
  const QuantityHandler = (isIncrease: boolean, foodId: string) => {
    const findCart = myCartData?.data?.cart?.cartItems?.find((item: any) => item?.food?._id === foodId)
    if (!findCart) return toast.error("Item not found in the cart")

    const currentQty = findCart?.quantity
    const newQty = isIncrease ? currentQty + 1 : currentQty - 1

    // Handle quantity decrease below 1
    if (!isIncrease && currentQty <= 1) {
      return useRemoveFromCart.mutate(foodId, {
        onSuccess: () => {
          refetchMyCart()
          toast.success("Item removed successfully")
        },
        onError: (error) => toast.error(error.message)
      })
    }

    // Update quantity
    useUpdateCart.mutate(
      { foodId, quantity: newQty },
      {
        onSuccess: () => {
          refetchMyCart()
          toast.success("Cart updated successfully")
        },
        onError: (error) => toast.error(error.message)
      }
    )
  }

  /**
   * Finds current quantity of a food item in cart
   * @param foodId - ID of the food item
   * @returns Current quantity or null if not in cart
   */
  const QuantityFinder = (foodId: string) => {
    const findCart = myCartData?.data?.cart?.cartItems?.find((item: any) => item?.food?._id === foodId)
    return findCart?.quantity || null
  }

  /**
   * Handles adding items to cart
   * @param foodId - ID of the food item to add
   */
  const addToCartHandler = (foodId: string) => {
    useAddToCart.mutate(foodId, {
      onSuccess: () => {
        toast.success("Item added to cart!")
        refetchMyCart()
      },
      onError: (error:any) => {
        if (error.status === 401) openModalHandler("LOGIN")
        toast.error(error.response?.data?.message || "Failed to add item")
      }
    })
  }

  return (
    <div className="bg-white py-8 px-4 md:px-16">
      {/* Category Filter Navigation */}
      <div className='flex items-center justify-center gap-2 my-2 border-b pb-4 flex-wrap'>
        {filterValues.map((item) => (
          <Link
            key={item.id}
            className={`px-4 py-2 text-lg font-medium text-gray-800 ${item.title === "starter" ? 'bg-primary-400 text-white' : ''}`}
            href={`#${item.title}`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Category Sections */}
      {filterValues.map((category) => (
        <div key={category.id} className="flex flex-col gap-4" id={category.title}>
          {/* Category Header */}
          <div
            style={{ 
              backgroundImage: `url(${category.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            className="relative h-52 rounded-lg overflow-hidden shadow-lg flex items-center justify-center"
          >
            <h2 className='text-white text-4xl z-50 font-Parisienne'>
              {category.title}
            </h2>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>

          {/* Food Items Grid */}
          <h3 className="text-3xl font-bold text-center font-notoSans">{category.title}</h3>
          <span className='flex items-center justify-center w-full'>
            <Image 
              src='/images/devider.png' 
              alt='divider' 
              width={1000} 
              height={200} 
            />
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 w-full gap-2 lg:w-5/6 mx-auto">
            {allFoodsData?.data?.foods
              .filter((food: FoodInterface) => food?.category?.name === category.filterCategoryValue)
              .sort((a: FoodInterface, b: FoodInterface) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              )
              .map((food: FoodInterface) => (
                <div key={food._id} className="flex justify-between items-start py-4 max-h-max border-b border-gray-200">
                  {/* Food Image */}
                  <div className='flex-[0_0_20%]'>
                    <Image
                      placeholder='blur'
                      blurDataURL="/images/placeholderimg.png"
                      src={
                        !food.image || food.image === defaultBackendImage
                          ? "/images/placeholderimg.png"
                          : `${backendImageUrl}/${food.image}`
                      }
                      alt={food.title}
                      className="object-cover rounded-md"
                      width={200}
                      height={200}
                    />
                  </div>

                  {/* Food Details */}
                  <div className="flex flex-col flex-[1_0_60%] w-full items-start">
                    <span className='flex items-center justify-start'>
                      {QuantityFinder(food._id) && (
                        <p className='text-lg font-bold text-primary-400 mr-1'>
                          {QuantityFinder(food._id)}x
                        </p>
                      )}
                      <h3 className="text-xl font-bold font-notoSans">
                        {food.title}
                      </h3>
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{food.desc}</p>
                    <span className="font-bold">£{food.price.toFixed(2)}</span>
                  </div>

                  {/* Cart Controls */}
                  <div className='flex items-center justify-center w-full flex-[0_0_7%] h-full'>
                    {findCartItemAvailabe(food._id) ? (
                      <span className='h-full flex items-center justify-center gap-1 flex-col'>
                        <button
                          onClick={() => QuantityHandler(true, food._id)}
                          className='flex h-full items-center justify-center mt-auto gap-1 border text-primary-400 border-primary-400 hover:bg-primary-500 p-1 transition-all hover:text-white'
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => QuantityHandler(false, food._id)}
                          className='flex h-full items-center justify-center mt-auto gap-1 border text-primary-400 border-primary-400 hover:bg-primary-500 p-1 transition-all hover:text-white'
                        >
                          <FaMinus />
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => addToCartHandler(food._id)}
                        className='flex h-full items-center justify-center mt-auto gap-1 border text-primary-400 border-primary-400 hover:bg-primary-500 p-1 transition-all hover:text-white'
                      >
                        <FaPlus />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuPageComponent