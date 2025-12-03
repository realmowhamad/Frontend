import Link from "next/link";

function HeroSection() {
 

    return (
        <div className="HeroSection_parent relative min-h-dvh p-10 text-center gap-6">
            <span className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute top-0 "></span>
            <h3 className="font-Parisienne text-primary-400 text-3xl z-50">Welcome to a place where every meal is a masterpiece.</h3>
            <h1 className="font-bold text-white z-50 font-notoSans text-5xl">Persian Riverside</h1>
            <div className="z-50 gap-2 flex flex-col items-center justify-center"> 
                <Link aria-label='tableReservation' href={"#tableReservation"} type="button" className="primaryBtn ">Reserve your table</Link>
                <Link aria-label='Address' href={"/menu"} type="button" className="primaryBtn ">Online order</Link>
            </div>
        </div>
    )
}

export default HeroSection;
