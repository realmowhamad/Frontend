import { useModal } from "@/context/ModalContext/ModalContext";
import UseAuth from "@/hooks/useAuth/useAuth";
import useCart from "@/hooks/useCart/useCart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBagShopping, FaFacebook, FaInstagram, FaTiktok, FaUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openModalHandler } = useModal()
    const [showCart, setShowCart] = useState(false);
    const { myCartData, refetchMyCart } = useCart().useGetMyCart(showCart);
    const { myDetailsData } = UseAuth().useGetMyDetails();
    const router = useRouter()
    useEffect(() => {
        setShowCart(true)
    }, [])

    useEffect(() => {
        refetchMyCart()
    }, [showCart])

    const cartHandler = () => {
        if (!myDetailsData) {
            openModalHandler('LOGIN')
        } else {
            router.push('/cart')
        }
    }
    const authorizationHandler = () => {
        if (!myDetailsData) {
            openModalHandler('LOGIN')
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <header className=" shadow-md border-b h-auto font-notoSans ">
            <div className="container mx-auto flex justify-between items-center px-4  ">
                {/* Social Media Icons */}
                <div className="hidden md:flex space-x-4 text-xl">
                    <Link href="#" aria-label='facebook' className="text-gray-700 hover:text-primary-400">
                        {<FaFacebook />}
                    </Link>
                    <Link href="#" aria-label='instagram' className="text-gray-700 hover:text-primary-400">
                        <FaInstagram />
                    </Link>
                    <Link href="#" aria-label='tiktok' className="text-gray-700 hover:text-primary-400">
                        <FaTiktok />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6 text-gray-800 ">
                    <Link href="/" aria-label='Home' className="hover:text-primary-400">
                        HOME
                    </Link>
                    <Link href="/menu" aria-label='Menu' className="text-primary-500 font-semibold">
                        MENU
                    </Link>
                    <Link href="/#tableReservation" aria-label='bookAtable' className="hover:text-primary-400" >
                        BOOK A TABLE
                    </Link>
                    <Image src="/icons/PRS.png" alt="logo" width={100} height={100} />

                    <Link href="/menu" aria-label='orderOnline' className="hover:text-primary-400">
                        ORDER ONLINE
                    </Link>
                    <Link href="#offers" aria-label='offers' className="hover:text-primary-400">
                        OFFERS
                    </Link>
                    <Link href="#footer" aria-label='Location' className="hover:text-primary-400">
                        LOCATIONS
                    </Link>

                </nav>




                {/* Cart Icon */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block relative">
                        <button type="button" onClick={cartHandler} className="text-gray-700 text-xl hover:text-primary-400">
                            <FaBagShopping />
                        </button>
                        <span className="absolute -top-1 -right-2 bg-primary-400 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {myCartData?.data?.cart?.cartItems?.length}
                        </span>
                    </div>
                    <button type="button" onClick={authorizationHandler} className="text-gray-700 text-xl hover:text-primary-400 hidden md:block">
                        <FaUser />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center justify-around bg-white py-2 px-6">
                <div className="flex-grow">
                    <Image src="/icons/PRS.png" alt="logo" width={50} height={50} />

                </div>
                <div className="flex items-center justify-between gap-4">
                    <button type="button" onClick={authorizationHandler} className="text-gray-700 text-xl hover:text-primary-400 hidden md:block">
                        <FaUser />
                    </button>
                    <div className="block md:hidden relative">
                        <button type="button" onClick={cartHandler} className="text-gray-700 text-xl hover:text-primary-400">
                            <FaBagShopping />
                        </button>
                        <span className="absolute -top-1 -right-2 bg-primary-400 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {myCartData?.data?.cart?.cartItems?.length}
                        </span>
                    </div>
                     <button type="button" onClick={authorizationHandler} className="text-gray-700 text-xl hover:text-primary-400  md:hidden">
                        <FaUser />
                    </button>
                    
                    <button
                        className="block md:hidden text-gray-700 text-xl hover:text-primary-500"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <IoMenu />
                    </button>
                </div>

                {/* Cart Icon */}

            </div>
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-white border-t border-gray-200">
                    <ul className="flex flex-col space-y-2 py-3 px-4">
                        <li>
                            <Link href="/" aria-label='Home' className="text-gray-700 hover:text-red-500">
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href="/menu"  aria-label='menu'className="text-red-500 font-semibold">
                                MENU
                            </Link>
                        </li>
                        <li>
                            <Link href="/#tableReservation" aria-label='bookAtable' className="hover:text-primary-400" >
                                BOOK A TABLE
                            </Link>
                        </li>
                        <li>
                            <Link href="/menu" aria-label='orderOnline' className="hover:text-primary-400">
                                ORDER ONLINE
                            </Link>


                        </li>
                        <li>
                            <Link href="#offers" aria-label='offers' className="hover:text-primary-400">
                                OFFERS
                            </Link>
                        </li>
                        <li>
                            <Link href="#footer" aria-label='Locations' className="hover:text-primary-400">
                                LOCATIONS
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/profile" aria-label='Locations' className="hover:text-primary-400">
                             PROFILE
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
