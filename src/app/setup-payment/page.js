"use client"

import {Fragment, useEffect, useState} from 'react'
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    `${ process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default function Home() {
    const [showDemo, setShowDemo] = useState(false)

    const triggerSetUpPayment = async (sessionId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/setup_intent?sessionId=${sessionId}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Log or handle the response data here
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }

    useEffect(() => {
        // Get sessionId from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id'); // Assuming 'session_id' is the param name
        if (sessionId) {
            // Call triggerSetUpPayment method
            triggerSetUpPayment(sessionId);
        }
    }, []);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Save Customer Card</h1>
                </div>
            </header>
            <div className="flex justify-center items-center h-32 ">
                <button onClick={() => {setShowDemo(!showDemo)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {showDemo === false ? "Show Video Demo!" : "Hide Video Demo!"}
                </button>
            </div>

            { showDemo &&
                <div className="flex justify-center items-center  ">
                    <iframe width="640" height="360" src="https://www.loom.com/embed/319b8103dadb475586fb8483b47d2491?sid=30b84952-08eb-45d9-8321-433019eeb174" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
                </div>
            }
            <div className="flex justify-center items-center  ">

                <form action="http://localhost:3000/api/setup_intent" method="POST">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Click to save a card!</button>
                </form>
            </div>

        </>
    )
}
