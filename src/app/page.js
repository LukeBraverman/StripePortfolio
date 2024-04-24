"use client"
import Image from "next/image";
import {Fragment, useState} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'



export default function Home() {
    const [showDemo, setShowDemo] = useState(true)

    return (
        <>


                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">Test card number: 4242 4242 4242 4242 </h1>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">Test card number with authentication: 4000 0025 0000 31552 </h1>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">Test card number with error: 4000 0000 0000 9995 </h1>

                        <p className="text-xl  tracking-tight text-gray-900">Use any Expiry date that is in the future! </p>
                        <p className="text-xl  tracking-tight text-gray-900">Use any address / made up emails! </p>


                    </div>
                </header>


                { showDemo &&
                    <div className="flex justify-center items-center  ">
                        <iframe width="640" height="360" src="https://www.loom.com/embed/1d8b6932f1ca4b5687608a94e9c53be2?sid=0e0ad7cb-a4b9-40b2-86a5-12c3be144995" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>                    </div>
                }


        </>
    )
}
