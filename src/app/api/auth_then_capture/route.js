import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            //
            const paymentIntent = await stripe.paymentIntents.create({
                customer: 'cus_Pyz29YwBWRWt6R',
                amount: 1066,
                currency: 'gbp',
                payment_method_types: ['card'],
                capture_method: 'manual',
            });
            // const paymentMethods = await stripe.paymentMethods.list({
            //     customer: 'cus_Pyz29YwBWRWt6R',
            //     type: 'card',
            // });
            // const paymentIntent = await stripe.paymentIntents.update(
            //     'pi_3P91FtF3AJJIi2121mRDpdRN',
            //     {
            //         payment_method:paymentMethods.data[0].id
            //         // metadata: {
            //         //     order_id: '6735',
            //         // },
            //     }
            // )
            //
           const intent = await stripe.paymentIntents.capture('pi_3P9AosF3AJJIi2121SV3xZQ6');
            // console.log(intent)
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
