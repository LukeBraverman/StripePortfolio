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

    const [showDemo, setShowDemo] = useState(true)

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Stripe Tax Demo</h1>
                </div>
            </header>
            {/*<div className="flex justify-center items-center h-32 ">*/}
            {/*    <button onClick={() => {setShowDemo(!showDemo)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">*/}
            {/*        {showDemo === false ? "Show Video Demo!" : "Hide Video Demo!"}*/}
            {/*    </button>*/}
            {/*</div>*/}

            { showDemo &&
                <div className="flex justify-center items-center  ">
                    <iframe width="640" height="360" src="https://www.loom.com/embed/5f2adcea0b2343449c776323db2a9ff5?sid=a946e91f-b8b4-429a-bfef-9657b4331f0d" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
                </div>
            }

        </>
    )
}
