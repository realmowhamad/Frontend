import React, { useEffect } from 'react'
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import CheckoutForm from "@/components/(Payment Components)/CheckoutForm";
import CompletePage from "@/components/(Payment Components)/CompeletePage";
import MainpageLayout from "@/Layout/MainpageLayout/MainpageLayout";
import { useRouter } from "next/router";


function Paymentpage_component() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    const [clientSecret, setClientSecret] = React.useState("");
    const [confirmed] = React.useState<boolean>(false);
    const router = useRouter();
    const { csid } = router.query;

    useEffect(() => {
        if (csid && typeof csid === 'string') {
            setClientSecret(csid);
            // setConfirmed(true);
        }

    }, []);




    const options: StripeElementsOptions = {
        clientSecret, // clientSecret should be a string
        appearance: {
            theme: "stripe" as "stripe" | "night" | "flat", // explicitly typed
        },
    };

    return (

        <div className="lpp">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    {confirmed ? <CompletePage /> : <CheckoutForm />}
                </Elements>
            )}

        </div>
    )
}

export default Paymentpage_component