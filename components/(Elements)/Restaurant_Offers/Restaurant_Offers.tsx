import Image from 'next/image'
import React from 'react'

function Restaurant_Offers() {
    const offers = [
        { id: 2, image: "/images/Students.webp", date: "7 days of a week", time: "", offerTitle: "Student Discount", description: "20% Off of the bill", note: "" },
        { id: 3, image: "/images/wineOffer.webp", date: "Thursday", time: "5pm to 10pm", offerTitle: "Wine Party", description: "A glass of house wine or Pint of beer", note: "By Reservation" },
        { id: 1, image: "/images/Lunch.webp", date: "Monday to Friday", time: "12pm to 5pm", offerTitle: "Lunch Offer", description: "20% Off of the bill", note: "By Reservation" },
    ]
    return (
        <div className='flex flex-col min-h-96 my-3' id='#offers'>
                <h1 className='text-center text-3xl text-primary-400 uppercase font-notoSans'>Persian Riverside Offers</h1>
                <Image src="/images/devider.png" alt="offer" width={500} height={100} className="mx-auto" />
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="relative h-96 rounded-lg overflow-hidden shadow-lg"
                        style={{ backgroundImage: `url(${offer.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        {/* Black Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                            <h3 className="text-3xl my-4 justify-self-start text-primary-400 font-bold mb-2">{offer.offerTitle}</h3>
                            <p className=" mb-1 text-2xl uppercase font-bold">{offer.description}</p>
                            {offer.date && <p className="text-3xl text-primary-400 mb-1">{offer.date}</p>}
                            {offer.time && <p className="text-lg mb-1">{offer.time}</p>}
                            {offer.note && <p className="text-lg italic">{offer.note}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Restaurant_Offers