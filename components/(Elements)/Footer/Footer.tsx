import Image from 'next/image';
import Link from 'next/link';
import { IoMdMail } from "react-icons/io";

import { FaFacebook, FaInstagram, FaLocationDot, FaPhone, FaTiktok } from 'react-icons/fa6';

function Footer() {
    const socialMedias = [
        { id: 1, name: 'Facebook', link: 'https://www.facebook.com/PRSKingston/', icon: <FaFacebook /> },
        { id: 2, name: 'Instagram', link: 'https://www.instagram.com/perisanriverside/', icon: <FaInstagram /> },
        { id: 3, name: 'Tiktok', link: 'https://www.twitter.com/perisanriverside/', icon: <FaTiktok /> },
    ];


    return (
        <footer className="bg-gray-100 py-8" id="footer">
            <div className="container mx-auto px-4 flex flex-wrap justify-between items-start gap-8">
                {/* Logo Section */}
                <div className="flex justify-center md:justify-start w-full md:w-auto">
                    <Image src="/icons/PRS.png" alt="logo" width={150} height={150} className="hidden md:block" />
                </div>

                {/* Contact Section */}
                <div className="flex flex-col flex-1 md:w-1/3">
                    <h1 className="text-xl font-bold uppercase text-center md:text-left mb-4">Contact Us</h1>
                    <Link href="https://maps.app.goo.gl/cNLWhusDy1PgPdCb9" aria-label='Address' target="_blank" className="flex items-center gap-2 text-primary-400 mb-2">
                        <FaLocationDot className="text-lg" />
                        <span>54 High Street, Kingston Upon Thames, KT1 1HN</span>
                    </Link>
                    <Link href="tel:+442085493333" aria-label='phone' className="flex items-center   gap-2 text-primary-400 mb-2">
                        <FaPhone className="text-lg" />
                        <span>020 8549 3333</span>
                    </Link>
                  
                    <Link href="mailto:info@persianriverside.co.uk" aria-label='phone' className="flex items-center   gap-2 text-primary-400 mb-2">
                        <IoMdMail className="text-lg" />
                        <span>info@persianriverside.co.uk</span>
                    </Link>
                    <div className="flex flex-wrap gap-4 mt-4">
                        {socialMedias.map((item) => (
                            <Link
                                key={item.id}
                                href={item.link}
                                aria-label={item.name}
                                target="_blank"
                                className="flex items-center gap-2 text-primary-400 hover:text-primary-600"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Information */}
                <div className="flex flex-col items-center  w-full md:w-auto">
                    <p className="text-sm text-center  mb-4">
                        Copyright &copy; 2025 Persian Riverside, All Rights Reserved.<br />
                        Web Application by <Link href="https://mistatech.co.uk?redirectfrom=https://persianriverside.co.uk" aria-label='Mista agency' className="text-primary-400 hover:underline">Mista tech Agency</Link>, Your Digital Transformation Partner in London UK.
                    </p>
                    <Image src="/images/Mista.PNG" alt="Mista-agency QR Code" width={100} height={100} />
                </div>
            </div>

            
        </footer>
    );
}

export default Footer;