import { useModal } from "@/context/ModalContext/ModalContext";
import UseAuth from "@/hooks/useAuth/useAuth";
import useCart from "@/hooks/useCart/useCart";
import { UserLoginDataInterface } from "@/services/auth/auth";
import { setCookie } from "cookies-next";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaLock, FaPhone, FaTimes } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [fetchCart, setFetchCart] = useState(false);
  const { closeModalHandler, openModalHandler } = useModal();

  const { useUserLogin } = UseAuth();
  const { myDetailsRefetch } = UseAuth().useGetMyDetails();
  const { refetchMyCart } = useCart().useGetMyCart(fetchCart);
  const [ErrorState, setErrorState] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserLoginDataInterface>();

  const onSubmit: SubmitHandler<UserLoginDataInterface> = (data: UserLoginDataInterface) => {
    useUserLogin.mutate(data, {
      onSuccess: (data) => {
        setFetchCart(true);
        setCookie('access', data.token);
        setErrorState(null);
        myDetailsRefetch();
        toast.success("Login successful! Welcome back");
        refetchMyCart();
        reset();
        closeModalHandler();
      }, 
      onError: (error: any) => {
        console.log(error);
        setErrorState(error.response.data.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden relative animate-fadeIn">
        {/* Close button */}
        <button 
          onClick={closeModalHandler}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>
        
        {/* Header */}
        <div className="pt-8 pb-2 px-6 text-center">
          <div className="inline-flex justify-center items-center mb-4">
            <Image
              src="/icons/PRS.png"
              alt="Persian Riverside Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          {ErrorState && (
            <div className="mt-3 py-2 px-3 bg-rose-50 text-rose-600 text-sm rounded-md">
              {ErrorState}
            </div>
          )}
        </div>
        
        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone Number Field */}
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhone className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                  <div className="flex items-center">
                    <Image
                      src="https://flagcdn.com/w320/gb.png"
                      alt="UK Flag"
                      width={16}
                      height={16}
                      className="h-4 w-4 rounded-sm"
                    />
                    <span className="ml-1 text-gray-500 text-sm">+44</span>
                  </div>
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  inputMode="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    maxLength: {
                      value: 10,
                      message: "Phone number must be at most 10 digits",
                    },
                  })}
                  className={`block w-full pl-28 pr-3 py-3 border ${
                    errors.phoneNumber ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="7418301857"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-600 text-xs mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { 
                    required: "Password is required" 
                  })}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
                onClick={() => openModalHandler("RECOVERY")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              }`}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary-600 hover:text-primary-500"
                onClick={() => openModalHandler("REGISTER")}
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
