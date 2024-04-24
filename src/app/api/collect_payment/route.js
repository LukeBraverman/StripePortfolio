import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {
            // const customer = await stripe.customers.create();

            const paymentIntent = await stripe.paymentIntents.create({
                customer:'cus_Pz81gkSSKyPaiw',
                setup_future_usage: 'off_session',
                amount: 1099,
                currency: 'gbp',
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
                //maybe set confirm to true
            });

            // const authPaymentAttepmt = await stripe.paymentIntents.retrieve(
            //     'pi_3P91FtF3AJJIi2121mRDpdRN'
            // );
            // const paymentIntent2 = await stripe.paymentIntents.create({
            //     customer: 'cus_PyzNIdqWEkg61J',
            //     amount: 1077,
            //     currency: 'gbp',
            //     payment_method_types: ['card'],
            //     capture_method: 'manual',
            // });
            return  NextResponse.json({ client_secret: paymentIntent.client_secret }, { status: 200 });
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
