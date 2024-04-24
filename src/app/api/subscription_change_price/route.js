import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            const subscriptions = await stripe.subscriptions.list({
                customer: 'cus_Pwl2k0IuAONrlP',
            });

            console.log('909 subscription id', subscriptions.data[0].id)
            console.log('909 sub items id', subscriptions.data[0].items.data[0].id)
            console.log('909 sub price id', subscriptions.data[0].items.data[0].price.id)

            const subscription = await stripe.subscriptions.update(
                subscriptions.data[0].id,
                {
                    items: [
                        {
                            id: subscriptions.data[0].items.data[0].id,
                            price: 'price_1P6r6RF3AJJIi212QSjyqh6X',
                        },
                    ],
                }
            );
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
                'Allow': 'GET'
            }
        });
    }
}

