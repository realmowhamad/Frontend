import { useModal } from "@/context/ModalContext/ModalContext"; // Importing modal context functions
import { default as UseAuth, default as useAuthLogic } from "@/hooks/useAuth/useAuth";
import { UserRegisterDataInterface } from "@/services/auth/auth";
import Image from "next/image"; // Importing image component
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Importing react-hook-form for form handling
import { toast } from "react-toastify";
import { FaLock, FaPhone, FaUser, FaTimes } from "react-icons/fa";

// Type definition for form inputs


 
const RegisterComponent: React.FC = () => {
  const [ErrorState, setErrorState] = useState<null | string>(null)


  // Modal context functionsw
  const { closeModalHandler, openModalHandler } = useModal();
  const { myDetailsRefetch } = UseAuth().useGetMyDetails();

  // Authentication logic hooks

  const { useUserRegister } = useAuthLogic();

  // useForm hook for form management
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterDataInterface>();

  // Form submission handler
  const onSubmit: SubmitHandler<UserRegisterDataInterface> = (data) => {
    useUserRegister.mutate(data, {
      onSuccess: () => {
        toast.success("Registration successful! Welcome to Persian Riverside");
        myDetailsRefetch()
        closeModalHandler();
      },
      onError: (error: any) => {
        setErrorState(error.response.data.message)
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
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          {ErrorState && (
            <div className="mt-3 py-2 px-3 bg-rose-50 text-rose-600 text-sm rounded-md">
              {ErrorState}
            </div>
          )}
        </div>
        
        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Full name should be minimum 3 characters",
                    },
                  })}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

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
                  inputMode="numeric"
                  maxLength={10}
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
                  autoComplete="new-password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Create a password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
              )}
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
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary-600 hover:text-primary-500"
                onClick={() => openModalHandler("LOGIN")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
