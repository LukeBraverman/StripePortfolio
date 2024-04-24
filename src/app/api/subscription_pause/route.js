import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {
            const subscription = await stripe.subscriptions.update(
                'sub_1P6ce0F3AJJIi212Izd68Hz2',
                {
                    pause_collection: {
                        behavior: 'void',
                    },
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
                'Allow': 'POST'
            }
        });
    }
}

