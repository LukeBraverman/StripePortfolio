"use client"
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51P1DthF3AJJIi2121zcSCEXpe5Cz52ztKknW6trT2YJGRaFaFEOlCmTZgdAzjaiztxWqlyPSEQvMjAFibXbPoGtX00cK7Jzw5G');

function StripeElementsProvider({children}) {
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
                })
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClientSecret();
        // console.log('777', PaymentStatus())
    }, []);

    return (
        <Elements stripe={stripePromise} options={options}>
            <>{children}</>
        </Elements>
    );
};

export default StripeElementsProvider;
