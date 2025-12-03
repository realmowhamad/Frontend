import { useModal } from '@/context/ModalContext/ModalContext';
import { useRouter } from 'next/router';
import { FaLock, FaArrowLeft } from 'react-icons/fa6';
import Image from 'next/image';

function Unauthorized_Component() {
    const router = useRouter();
    const { openModalHandler } = useModal();
    
    const handleLogin = () => {
        openModalHandler('LOGIN');
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden p-8 text-center">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-rose-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        <FaLock className="text-rose-500 text-3xl" />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-3xl font-bold text-rose-500 mr-3">401</span>
                        <div className="h-10 w-px bg-gray-300 mx-3"></div>
                        <p className="text-gray-600">Unauthorized Access</p>
                    </div>
                    
                    <p className="text-gray-500 mb-6">
                        You don't have permission to access this page. Please log in to continue.
                    </p>
                </div>
                
                <div className="space-y-3">
                    <button 
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={handleLogin}
                    >
                        <span>Login to Your Account</span>
                    </button>
                    
                    <button 
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={() => router.back()}
                    >
                        <FaArrowLeft size={14} />
                        <span>Go Back</span>
                    </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <button 
                            className="text-primary-500 hover:underline"
                            onClick={() => openModalHandler('REGISTER')}
                        >
                            Register Now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized_Component;