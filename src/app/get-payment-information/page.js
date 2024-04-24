"use client"
import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import ImageGridAndDetails from '@/components/product-display/imageGridAndDetails';
import StripeCheckoutButton from '@/components/stripe/stripeCheckoutButton';
import OneTimePaymentFailute from '@/components/alerts/OneTimePaymentFailute';
import OneTimePaymentSucceed from '@/components/alerts/OneTimePaymentSucceed';
import {Elements} from "@stripe/react-stripe-js";
import PaymentElementCheckoutForm from "@/components/stripe/CollectPaymentCard/PaymentElementForm";
import PaymentStatus from "@/components/stripe/CollectPaymentCard/PaymentStatus";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
'pk_test_51P1DthF3AJJIi2121zcSCEXpe5Cz52ztKknW6trT2YJGRaFaFEOlCmTZgdAzjaiztxWqlyPSEQvMjAFibXbPoGtX00cK7Jzw5G');

export default function Home() {
    const [clientSecret, setClientSecret] = useState('');
    const [options, setOptions] = useState();

    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch client secret from API
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('/api/collect_payment', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('808', data)
                setClientSecret(data.client_secret);
                setOptions({
                    clientSecret: data.client_secret,
                    // appearance: {
                    //     theme: 'night',
                    //     variables: {
                    //         colorText: '#c90076',
                    //
                    //     }
                    // }
                })
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClientSecret();
        // console.log('777', PaymentStatus())
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Handle payment with Stripe using clientSecret
        const stripe = await stripePromise;

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: {
                    // Add card details here
                },
            },
        });

        if (error) {
            // Handle error
            console.error(error);
        } else if (paymentIntent.status === 'succeeded') {
            // Payment successful
            console.log('Payment succeeded');
        } else {
            // Payment pending
            console.log('Payment pending');
        }
    };

    if (error | !options) {
        return <div>Error: {error}</div>;
    }
    const appearance = {
        theme: 'night',
        variables: {
            colorText: '#c90076',

        }
    }
    console.log('555',options)
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Get Payment Card</h1>
                </div>
            </header>
            {/*<PaymentElementCheckoutForm options={options} stripePromise={stripePromise}/>*/}

            <Elements stripe={stripePromise} options={options}  >
                <PaymentElementCheckoutForm options={options} stripePromise={stripePromise}/>

                {/*<form id="payment-form" onSubmit={handleSubmit} data-secret={clientSecret} >*/}
                {/*    <div id="payment-element">*/}

                {/*    </div>*/}
                {/*    <button id="submit">Submit</button>*/}
                {/*</form>*/}
            </Elements>

        </>
    );
}
