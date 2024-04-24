import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function POST(req) {
    if (req.method === 'POST') {
        try {

            const prices = await stripe.prices.list({
                lookup_keys: [req.body.lookup_key],
                expand: ['data.product'],
            });

            const session = await stripe.checkout.sessions.create({
                // billing_cycle_anchor_config: {
                //     day_of_month: 15,
                //     hour: 12,
                //     minute: 30,
                //     second: 0,
                // },
                customer: 'cus_Pz8bvZT5Q4DIy0',
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: prices.data[1].id,
                        // For metered billing, do not pass quantity
                        quantity: 1,

                    },
                ],

                discounts: [
                    {
                        promotion_code: 'promo_1P6uWQF3AJJIi212mbGh1Pau',
                    },
                ],
                mode: 'subscription',
                subscription_data: {
                     trial_period_days: 7
                },

                success_url: `http://localhost:3000/subscriptions?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:3000/subscriptions?canceled=true`,
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

