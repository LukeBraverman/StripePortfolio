import {NextResponse} from "next/server";
// const stripe = require('stripe')('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H');
import { headers } from 'next/headers';
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')

const fulfillOrder = (lineItems) => {
    // TODO: fill me in
    console.log("Fulfilling order", lineItems);
}

/* Delayed payment methods */
const createOrder = (session) => {
    // TODO: fill me in
    console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
}
//////

export async function POST(req) {
    const body = await req.text();
    console.log('393body',body)
    const sig = headers().get('Stripe-Signature')?.toString();

    const webhookSecret ='whsec_ede73f9b33fc7526db1eccf488bdbb606237b5311b5ae2c2db8b93dc254a32d2';
    // const sig = request.headers['stripe-signature'];

    let event;
    // secure webhook
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.log('3333', err)
        return new Response('Webhook handler failed. View logs.', {
            status: 400
        });    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            }
        );
        const lineItems = sessionWithLineItems.line_items;

        // Fulfill the purchase...
        fulfillOrder(lineItems);
    }

    // USE BELOW FOR DELAYED PAYMENT CARDS

    // switch (event.type) {
    //     case 'checkout.session.completed': {
    //         const session = event.data.object;
    //         // Save an order in your database, marked as 'awaiting payment'
    //         createOrder(session);
    //
    //         // Check if the order is paid (for example, from a card payment)
    //         //
    //         // A delayed notification payment will have an `unpaid` status, as
    //         // you're still waiting for funds to be transferred from the customer's
    //         // account.
    //         if (session.payment_status === 'paid') {
    //             fulfillOrder(session);
    //         }
    //
    //         break;
    //     }
    //
    //     case 'checkout.session.async_payment_succeeded': {
    //         const session = event.data.object;
    //
    //         // Fulfill the purchase...
    //         fulfillOrder(session);
    //
    //         break;
    //     }
    //
    //     case 'checkout.session.async_payment_failed': {
    //         const session = event.data.object;
    //
    //         // Send an email to the customer asking them to retry their order
    //         emailCustomerAboutFailedPayment(session);
    //
    //         break;
    //     }
    // }


    return new Response(JSON.stringify({ received: true }));
}
