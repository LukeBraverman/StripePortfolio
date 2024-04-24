import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function POST(req) {
    if (req.method === 'POST') {
        try {

            const session = await stripe.checkout.sessions.create({
                mode: 'setup',
                currency: 'usd',
                // optional
                // customer: '{{CUSTOMER_ID}}',
                // success_url: 'http://localhost:3000/setup-payment?success=true&session_id={CHECKOUT_SESSION_ID}',
                // cancel_url: 'http://localhost:3000/setup-payment?canceled=true',
                success_url: 'https://stripe-portfolio.vercel.app/setup-payment?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url: 'https://stripe-portfolio.vercel.app/setup-payment?canceled=true',
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

export async function GET(req) {
    if (req.method === 'GET') {
        try {
            const {searchParams} = new URL(req.url);
            console.log('999',searchParams )

            const sessionId = searchParams.get("sessionId");

            if (!sessionId) {
                throw { message: 'sessionId is required', statusCode: 400 };
            }

            const session = await stripe.checkout.sessions.retrieve(
                sessionId
            );

            // console.log('988',session)
            const setUpIntentId = session.setup_intent;
            const setupIntent = await stripe.setupIntents.retrieve(setUpIntentId);
            const paymentId = setupIntent.payment_method;
            console.log('988 setupintent: ',setupIntent)
            // const customer = await stripe.customers.create(
            //     {
            //         name: 'setupIntentGuy',
            //         email: 'setupIntentGuy@example.com',
            //     }
            // );

            const paymentMethod = await stripe.paymentMethods.attach(
                paymentId,
                {
                    customer: 'cus_Pz5WNpHVGEOsEA',
                }
            );

            return NextResponse.json({}, { status: 200 });
        } catch (err) {
            return NextResponse.json(err.message, { status: err.statusCode || 500 });
        }
    } else {
        return NextResponse.json('Method Not Allowed', {
            status: 405,
            headers: {
                'Allow': 'GET'
            }
        });
    }
}
