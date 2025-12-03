import { useModal } from "@/context/ModalContext/ModalContext";
import useCart from "@/hooks/useCart/useCart";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";


export interface FoodInterface {
    _id: string;
    title: string;
    desc?: string;
    price: number;
    category: {
        name: string;
        createdAt: string;
        _id: string;
        __v: number;
    };
    image: string;
    vegeterian: boolean;
    status: "active" | "deactive";
    alergian: boolean;
    createdAt: Date;



}


interface FoodCartInterface {
    food: FoodInterface;
}

const FoodCart: React.FC<FoodCartInterface> = ({ food }) => {
    const { openModalHandler } = useModal()
    const { refetchMyCart } = useCart().useGetMyCart()



    const { useAddToCart } = useCart()
    const addToCartHandler = () => {
        // Add food to cart
       
        useAddToCart.mutate(food._id, {
            onSuccess: () => {
                toast.success("Food added to cart successfully!");
                refetchMyCart()
            },
            onError: (error: any) => {
                if (error.status === 401) {
                    openModalHandler("LOGIN")
                    toast.error(error.response.data.message);

                }
                toast.error(error.response.data.message);

                // Show error notification or something else here
            }
        })
    }


    return (
        <div
            key={food._id}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
        >
            <div className="relative h-40 w-full mb-4">
                <Image
                    src={`/images/ghafghazi.webp`}
                    alt={food.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-t-lg"
                />
            </div>
            <h2 className="text-lg font-bold text-primary-400">{food.title}</h2>
            <p>
                {food.desc}
            </p>

            <span className="flex items-center justify-end">

                <p className="text-primary-500 text-lg font-semibold">
                    £{food.price.toFixed(2)}
                </p>
            </span>
            <button
                type="button"
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                onClick={addToCartHandler}
            >

                Add To Order
            </button>
        </div>
    );
};

export default FoodCart;
