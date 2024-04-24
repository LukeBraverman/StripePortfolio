import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function POST(req) {
    if (req.method === 'POST') {
        try {
            const {searchParams} = new URL(req.url);
            console.log('999',searchParams )

            const session_id = searchParams.get("session_id");

            if (!session_id) {
                throw { message: 'sessionId is required', statusCode: 400 };
            }
            const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

            const returnUrl = 'http://localhost:3000/subscriptions';

            const portalSession = await stripe.billingPortal.sessions.create({
                customer: checkoutSession.customer,
                return_url: returnUrl,
            });


            return  NextResponse.redirect(portalSession.url, { status: 303 });
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

