import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            const paymentMethods = await stripe.paymentMethods.list({
                customer: 'cus_Pyz29YwBWRWt6R',
                type: 'card',
            });

            console.log('808',paymentMethods)
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: 1099,
                    currency: 'gbp',
                    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                    automatic_payment_methods: {enabled: true},
                    customer: 'cus_Pyz29YwBWRWt6R',
                    payment_method: paymentMethods.data[0].id,
                    return_url: 'http://localhost:3000/',
                    off_session: true,
                     confirm: true,
                });
            } catch (err) {
                // Error code will be authentication_required if authentication is needed
                console.log('Error code is: ', err.code);
                const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
                console.log('PI retrieved: ', paymentIntentRetrieved.id);
                return  NextResponse.json(err, { status: 500 });
            }

            return  NextResponse.json({}, { status: 200 });
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
