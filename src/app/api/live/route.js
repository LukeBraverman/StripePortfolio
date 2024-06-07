import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('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')
/* Collect card - use collected card */
export async function POST(req) {
    console.log('called')
    if (req.method === 'POST') {
        try {

                // Create Checkout Sessions from body params.
                const session = await stripe.checkout.sessions.create({
                    // payment_intent_data: {
                    //     capture_method: "manual"
                    // },
                    customer_creation: 'always',
                    automatic_tax: {enabled: true},
                    line_items: [
                        {
                            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                            price: 'price_1PA9tVF3AJJIi212teGDmTDx',
                            quantity: 3,
                        },
                    ],

                    mode: 'payment',
                    success_url: `http://localhost:3000/live?success=true`,
                    cancel_url: `http://localhost:3000/liv?canceled=true`,
                    // success_url: `https://stripe-portfolio.vercel.app/one-time-payment?success=true`,
                    // cancel_url: `https://stripe-portfolio.vercel.app/one-time-payment?canceled=true`,

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

