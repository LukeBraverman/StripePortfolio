"use client"
import Image from "next/image";
import {Fragment, useState} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import ImageGridAndDetails from "@/components/product-display/imageGridAndDetails";
import StripeCheckoutButton from "@/components/stripe/stripeCheckoutButton";
import OneTimePaymentFailute from "@/components/alerts/OneTimePaymentFailute";
import OneTimePaymentSucceed from "@/components/alerts/OneTimePaymentSucceed";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    `${ process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default function Home() {
    const [showFailed, setShowFailed] = useState(false);
    const [showSucceed, setShowSucceed] = useState(false);
    const [showDemo, setShowDemo] = useState(false)
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            setShowSucceed(true);
        }

        // if (query.get('canceled')) {
        //     setShowFailed(true);
        //     console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        // }
    }, []);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">One Time Payment Demo</h1>
                </div>
            </header>
            <div className="flex justify-center items-center h-32 ">
                <button onClick={() => {setShowDemo(!showDemo)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {showDemo === false ? "Show Video Demo!" : "Hide Video Demo!"}
                </button>
            </div>

            { showDemo &&
                <div className="flex justify-center items-center  ">
                    <iframe width="640" height="360" src="https://www.loom.com/embed/f701855cb51445868b5671f68d4ebd96?sid=7655494a-5492-4959-a951-753d3b95c696" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>

                </div>
            }



            {showSucceed && <OneTimePaymentSucceed />}
            {showFailed && <OneTimePaymentFailute />}
            <div className="p-32 pt-0 ">
                <ImageGridAndDetails />

            </div>
        </>
    )
}
