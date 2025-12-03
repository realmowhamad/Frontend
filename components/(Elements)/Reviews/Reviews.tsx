import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft, FaStar } from "react-icons/fa6";

const peopleReviews = [
    {
        id: 1,
        name: "Sara Jabbari",
        review:"Persian Riverside in Kingston is a fantastic spot for authentic Iranian cuisine! The kebabs are juicy and flavorful, and the saffron rice is a standout. The warm atmosphere and friendly staff make for a delightful dining experience. Highly recommend trying their Ghormeh sabzi and makhsoos kebab 👌🏻 thank you guys for making our visit special everytime, will definitely come back again soon!",
    },
    {
        id: 2,
        name: "Ali Fakhar",
        review:"The Koobideh kebab I had here was among the top 3 I've ever had in London. It was very delicious, and a mouth-watering kebab which you could eat with both rice and fresh bread, because the balance of the fat was perfectly controlled, if you know what I mean. Chengeh kebab was also amazing and tender. Their bread is also fresh and it tastes wonderful. In total, I highly recommend this place and now it's one of my favorite places in London.",
    },
    {
        id: 3,
        name: "F Clough",
        review:"The new Persian riverside restaurant and bar, formerly Narenj under new management, is magnificent. The food was delicious, fresh, and the staff were attentive and welcoming. We liked it so much that we bought food to take home too. I highly recommend this restaurant to all my friends and family.",
    },
    {
        id: 4,
        name: "Donya",
        review:"One of the best Persian restaurants recommended %100 and I’ll definitely go back",
    },
    {
        id: 5,
        name: "Keyvan Hojjati",
        review: "This restaurant has a unique and innovative approach to food. Their kabab is both tender and juicy, and it's served with a nice layer of saffron. Their mouth-watering saffron rice is a must-try, and it's a great addition to their dishes. Their atmosphere is warm and friendly, and the staff is very attentive. I highly recommend this restaurant to anyone looking for a great dining experience.",
    },
];

const ReviewSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === peopleReviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? peopleReviews.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === peopleReviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, [peopleReviews.length]);

    return (
        <div className="slider-container w-full min-h-96 h-auto flex items-center justify-center flex-col p-5 " >
            <h2 className="slider-title text-3xl m-4 uppercase font-bold text-center">What People Say About Us</h2>
            <h3 className="slider-name text-2xl font bold">{peopleReviews[currentIndex].name}</h3>
            <div className="text-yellow-400 flex items-center justify-center gap-1 my-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

            </div>
            <div className="slider-content  w-full lg:w-1/2 flex items-center justify-center gap-2">
                <button className="slider-arrow" onClick={prevSlide}>
                    {<FaChevronLeft />}
                </button>
                <div className="slider-item">
                    <p className="slider-review  text-justify">"{peopleReviews[currentIndex].review}"</p>
                </div>
                <button className="slider-arrow" onClick={nextSlide}>
                    {<FaChevronRight />}
                </button>
            </div>
        </div>
    );
};

export default ReviewSlider;
