"use client"
import {Fragment, useState} from 'react'

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';


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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pricing Table</h1>
                </div>
            </header>
            <div className="flex justify-center items-center h-32 ">
                <button onClick={() => {setShowDemo(!showDemo)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {showDemo === false ? "Show Video Demo!" : "Hide Video Demo!"}
                </button>
            </div>

            { showDemo &&
                <div className="flex justify-center items-center  ">
                    <iframe width="640" height="360" src="https://www.loom.com/embed/58bc17e6453d43bdbb335db77bc7c59e?sid=398b316d-9e01-4aa2-8de7-e976cb8d3772" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
                </div>
            }
                <stripe-pricing-table
                    pricing-table-id="prctbl_1P8O6wF3AJJIi212HHlsHNzW"
                    publishable-key="pk_test_51P1DthF3AJJIi2121zcSCEXpe5Cz52ztKknW6trT2YJGRaFaFEOlCmTZgdAzjaiztxWqlyPSEQvMjAFibXbPoGtX00cK7Jzw5G"
                >
                </stripe-pricing-table>


        </>
    )
}
