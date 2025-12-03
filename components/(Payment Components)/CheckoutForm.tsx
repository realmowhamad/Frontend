import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import Link from "next/link";

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://persianriverside.co.uk/payment",
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "An error occurred");
            } else {
                setMessage("An unexpected error occurred.");
            }
        }

        setIsLoading(false);
    };



    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs",
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
            <form id="payment-form" className="paymentform stripeForm" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button className="stripeButton" disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>

        </div>
    );
};

export default CheckoutForm;
