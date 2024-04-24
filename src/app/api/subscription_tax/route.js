import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            // const product = await stripe.products.create({
            //     name: 'Taxable Product',
            //     tax_code: 'txcd_10000000',
            // });
            //
            // const productId = product.id;
            // console.log('point 1', productId)
            //
            // const price = await stripe.prices.create({
            //     unit_amount: 1000,
            //     currency: 'gbp',
            //     recurring: {
            //         interval: 'month',
            //     },
            //     product: productId,
            //     tax_behavior: 'exclusive',
            // });
            // const priceId = price.id;

            // const customer = await stripe.customers.create({
            //     description: 'a new taxable user',
            //     email: 'franklin@example.com',
            //     // can use ip address also
            //     address: {
            //         line1: '510 Townsend St',
            //         city: 'San Francisco',
            //         state: 'CA',
            //         country: 'US',
            //         postal_code: '94103',
            //     },
            //     expand: ['tax'],
            // });

            // console.log('customer', customer)

            // const paymentMethods = await stripe.paymentMethods.list({
            //     customer: 'cus_Px74OBa39z25S1',
            //     type: 'card',
            // });
            //
            // const subscription = await stripe.subscriptions.create({
            //     customer: 'cus_Px74OBa39z25S1',
            //     items: [
            //         {
            //             price: 'price_1P7CabF3AJJIi21216yrvOWY',
            //             quantity: 1,
            //         },
            //     ],
            //     default_payment_method: paymentMethods.data[0].id,
            //     automatic_tax: {
            //         enabled: true,
            //     },
            //     // payment_behavior: 'default_incomplete',
            //     expand: ['latest_invoice'],
            // });

            const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
                customer: 'cus_Px74OBa39z25S1',
                subscription_items: [
                    {
                        price: 'price_1P7CabF3AJJIi21216yrvOWY',
                        quantity: 1,
                    },
                ],
                automatic_tax: {
                    enabled: true,
                },
            });

            console.log('909 invoice' , upcomingInvoice)

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

