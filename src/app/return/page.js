"use client"
import Image from "next/image";
import {Fragment, useEffect, useState} from 'react'
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

export default function Return() {

    useEffect(() => {
        window.location.href = 'https://portfolio-ah0edxd4u-lukebravermans-projects.vercel.app/';
    }, [])

    return (
        <>
        <p> Returning to main site...</p>
        </>
    )
}
