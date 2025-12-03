import Image from 'next/image';
import React from 'react';






const MenuPreview: React.FC = () => {


    const MenuItems = [
        { id: 3, imageUrl: "/images/3.jpg" },
        { id: 2, imageUrl: "/images/2.jpg" },
        { id: 1, imageUrl: "/images/1.jpg" },
        { id: 4, imageUrl: "/images/4.jpg" },
    ];





    return (
        <div className="bg-white py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="text-center ">
                    <h2 className="text-3xl  text-primary-400 font-meow">Welcome To Persian Riverside</h2>
                    <h1 className="text-4xl font-bold text-gray-800 mt-2">Know More About Us</h1>
                    <div className="flex justify-center ">
                        <div className="w-16 border-t-4 border-primary-400 my-4"></div>
                    </div>
                    <p className="text-gray-500 text-lg leading-relaxed">
                    At our restaurant, we take pride in offering a unique dining experience with a focus on exceptional service, quality ingredients, and a welcoming atmosphere. Every meal is crafted to delight your senses and create memorable moments.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-primary-400 text-white text-lg font-medium rounded-full shadow-lg hover:bg-green-500 transition">
                        Read More
                    </button>
                </div>

                {/* Right Column */}
                <div className="grid grid-cols-2 gap-4 items-stretch">
                    {MenuItems.map((item) => (
                            <Image src={item.imageUrl} alt="menu" key={item.id}  width={300} height={500} className="rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default MenuPreview