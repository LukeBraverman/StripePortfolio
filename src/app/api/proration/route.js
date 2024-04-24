import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            // const subscriptions = await stripe.subscriptions.list({
            //     customer: 'cus_Px74OBa39z25S1',
            // });
            //
            // console.log(subscriptions.data[0].items)
            // const subscription = await stripe.subscriptions.update(
            //     'sub_1P7DRxF3AJJIi212n7TmidGr',
            //     {
            //         items: [
            //             {
            //                 id: 'si_Px7h9Hwe2VeMmi',
            //                 price: 'price_1P7zSxF3AJJIi212MeVL0Qx8',
            //             },
            //         ],
            //     }
            // );

            // Set proration date to this moment:
            const proration_date = Math.floor(Date.now() / 1000);

            const subscription = await stripe.subscriptions.retrieve('sub_1P7DRxF3AJJIi212n7TmidGr');

        // See what the next invoice would look like with a price switch
        // and proration set:
            const items = [{
                id: 'si_Px7h9Hwe2VeMmi',
                price: 'price_1P7zfQF3AJJIi212illO8F2w', // Switch to new price
            }];

            const invoice = await stripe.invoices.retrieveUpcoming({
                customer: 'cus_Px74OBa39z25S1',
                subscription: 'sub_1P7DRxF3AJJIi212n7TmidGr',
                subscription_items: items,
                subscription_proration_date: proration_date,
            });
            console.log(invoice.lines.data)
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

