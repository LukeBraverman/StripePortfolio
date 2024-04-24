import {NextResponse} from "next/server";
// const stripe = require('stripe')('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H');
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')

/* one time charge */
export async function POST(req) {
    if (req.method === 'POST') {
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_intent_data: {
                capture_method: "manual"
            },
            customer_creation: 'always',
            // optional adds

            // customer_email: 'customer@example.com',
            // customer: 'cus_Pz8bvZT5Q4DIy0',
            // submit_type: 'donate',
            // billing_address_collection: 'auto',
            // shipping_address_collection: {
            //     allowed_countries: ['US', 'CA', 'GB'],
            // },
            automatic_tax: {enabled: true},
            // optional add end

            // tax_id_collection: {
            //     enabled: true,
            // },
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1P54bIF3AJJIi212wpw65ktC',
                    quantity: 1,
                },
            ],
            // custom_fields: [
            //     {
            //         key: 'engraving',
            //         label: {
            //             type: 'custom',
            //             custom: 'Personalized engraving',
            //         },
            //         type: 'text',
            //     },
            // ],
   /*         discounts: [
                {
                    coupon: '7mYGH4AR',
                },
            ],*/
            // allow_promotion_codes:true,
            mode: 'payment',
            // success_url: `http://localhost:3000/one-time-payment?success=true`,
            // cancel_url: `http://localhost:3000/one-time-payment?canceled=true`,
            success_url: `https://stripe-portfolio.vercel.app/one-time-payment?success=true`,
            cancel_url: `https://stripe-portfolio.vercel.app/one-time-payment?canceled=true`,

        });

        return  NextResponse.redirect(session.url, { status: 303 });
    } catch (err) {
        //res.status(err.statusCode || 500).json(err.message);
        return  NextResponse.json(err, { status: 500 });
    }
} else {
    // res.status(405).end('Method Not Allowed');
        // Correct usage of NextResponse
        return  NextResponse.json('Method Not Allowed', {
            status: 405,
            headers: {
                'Allow': 'POST'
            }
        });
    }
}
