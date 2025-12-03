import React from 'react'
import Link from 'next/link'

function HeadBar() {
    return (
        <div className='w-full bg-red-700 font-bold text-white h-8 flex items-center justify-center gap-10 uppercase text-lg'>
            <h2>10% Off For Collection</h2>
            <Link aria-label='Phone' href={"tel:+44208549333"}>020 8549 3333</Link>
        </div>
    )
}

export default HeadBar