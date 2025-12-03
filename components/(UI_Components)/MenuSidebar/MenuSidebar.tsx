import useCategories from "@/hooks/useCategories/useCategories";
import { CategoryInterface } from "@/services/categories/categories";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";

function MenuSideBar() {
    const router = useRouter();

    // State to track the active (clicked) category
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const { allCategoriesData } = useCategories().getAllCategories()


    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(activeCategory === categoryId ? null : categoryId);
    };


    return (
        <div className="w-full hidden lg:block py-2  h-auto">
            <ul className=" rounded-lg flex items-center justify-evenly">
                {allCategoriesData?.data?.categories
                    .sort((a: CategoryInterface, b: CategoryInterface) => {
                        // Assuming createdAt is in a valid date format (e.g., string, ISO date string)
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateA.getTime() - dateB.getTime(); // A to Z (ascending order)
                    })
                    .map((category: CategoryInterface) => (
                        <li key={category._id} className={`hover:bg-primary-400 hover:text-white transition-all rounded-lg cursor-pointer p-3 flex flex-col items-center justify-start gap-2 ${category._id === activeCategory && "bg-primary-400 text-white"
                            }`}
                            onClick={() => handleCategoryClick(category._id)}
                        >

                            <i>{<GiForkKnifeSpoon />}</i>
                            <p className="text-xl text-center">{category.name}</p>
                        </li>
                    ))}
            </ul>
        </div>

    );
}

export default MenuSideBar;
