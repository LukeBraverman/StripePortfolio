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

    const [showDemo, setShowDemo] = useState(false)


    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">No Code Integrations Demo</h1>
                </div>
            </header>
            <div className="flex justify-center items-center h-32 ">
                <button onClick={() => {setShowDemo(!showDemo)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {showDemo === false ? "Show Video Demo!" : "Hide Video Demo!"}
                </button>
            </div>

            { showDemo &&
                <div className="flex justify-center items-center  ">
                    <iframe width="640" height="360" src="https://www.loom.com/embed/698d833cbac246819dbb8e2674c3bdeb?sid=3c4d9707-9716-4f28-980f-17e3c94feca2" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
                </div>
            }
            <div className="flex justify-center items-center    flex-col	gap-8	  ">

                <p className="cursor-pointer text-blue-400 hover:text-blue-700" onClick={() => {
                    window.open('https://buy.stripe.com/test_eVa9AH6omau1gCY6oo', '_blank');

                    }}> Click me to see a payment link in action!</p>


                <stripe-buy-button
                    buy-button-id="buy_btn_1P8ppgF3AJJIi2127RExdtRB"
                    publishable-key="pk_test_51P1DthF3AJJIi2121zcSCEXpe5Cz52ztKknW6trT2YJGRaFaFEOlCmTZgdAzjaiztxWqlyPSEQvMjAFibXbPoGtX00cK7Jzw5G"
                >
                </stripe-buy-button>

                <Image
                    src="/qrcode.png"
                    width={250}
                    height={250}
                    alt="https://buy.stripe.com/test_eVa9AH6omau1gCY6oo"
                />
            </div>



        </>
    )
}
