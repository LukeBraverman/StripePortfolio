"use client"

import {Fragment, useEffect, useState} from 'react'
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    `${ process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);
const ProductDisplay = () => (
    <section className="border-4 rounded-xl p-16 flex justify-center items-center flex-col">
        <div className="product mb-4">
            <div className="description">
                <h3 className='text-2xl'>Bronze plan</h3>
                <h5>$19.99 / month</h5>
            </div>
        </div>

        <form action=" https://stripe-portfolio.vercel.app/api/subscription_checkout" method="POST">
            {/* Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value="bronze" />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                id="checkout-and-portal-button" type="submit">
                Checkout
            </button>
        </form>
        {/*<form action="http://localhost:3000/api/subscription_checkout" method="POST">*/}
        {/*    /!* Add a hidden field with the lookup_key of your Price *!/*/}
        {/*    <input type="hidden" name="lookup_key" value="bronze" />*/}
        {/*    <button*/}
        {/*        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"*/}
        {/*        id="checkout-and-portal-button" type="submit">*/}
        {/*        Checkout*/}
        {/*    </button>*/}
        {/*</form>*/}
    </section>
);

const SuccessDisplay = ({ sessionId }) => {
    // const URL = `http://localhost:3000/api/subscription_manage?session_id=cs_test_a1nscoYY8B5xdbAkwAEQngaKMoNsIG1ls66HAoFte1StD1YrVnApeeGVOc`
    const URL = `https://stripe-portfolio.vercel.app/api/subscription_manage?session_id=cs_test_a1nscoYY8B5xdbAkwAEQngaKMoNsIG1ls66HAoFte1StD1YrVnApeeGVOc`

    return (
        <section>
            {/*<div className="product Box-root">*/}
            {/*    <div className="description Box-root">*/}
            {/*        <h3>Subscription to starter plan successful!</h3>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <form action={URL} method="POST">
                <input
                    type="hidden"
                    id="session-id"
                    name="session_id"
                    value={sessionId}
                />
                <button className="cursor-pointer text-blue-400 hover:text-blue-700 text-2xl"  id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </button>
            </form>
        </section>
    );
};
export default function Home() {
    const [sessionId, setSessionId] = useState(null);
    const [showDemo, setShowDemo] = useState(false)

    useEffect(() => {
        // Get sessionId from URL params
        const urlParams = new URLSearchParams(window.location.search);
        // const sessionId = urlParams.get('session_id'); // Assuming 'session_id' is the param name
        const sessionId = 'placeholder'; // Assuming 'session_id' is the param name

        console.log('called', urlParams)
        if (sessionId) {
            // Call triggerSetUpPayment method
            setSessionId(sessionId);
        }
    }, []);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Subscriptions</h1>
                </div>
            </header>
            <div className="flex justify-center items-center mt-8 ">
                <button onClick={() => {setShowDemo(!showDemo)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {showDemo === false ? "Show Video Demo!" : "Hide Video Demo!"}
                </button>
            </div>

            { showDemo &&
                <div className="flex justify-center items-center  ">
                    <iframe width="640" height="360" src="https://www.loom.com/embed/40710393646842cc9f1d2845894e254d?sid=4db389e1-110b-4cfd-beab-2492f21edc74" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>                </div>
            }
            <div className="flex justify-center items-center    flex-col	gap-8 mt-16	  ">
                <ProductDisplay />
                {sessionId && <SuccessDisplay sessionId={sessionId} />}
            </div>

        </>
    )
}
