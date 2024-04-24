import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            // const product = await stripe.products.create({
            //     name: 'Gold Special',
            // });
            // const price = await stripe.prices.create({
            //     product: 'prod_PxX7R3PuuZ3StP',
            //     unit_amount: 1000,
            //     currency: 'gbp',
            // });
            // const customer = await stripe.customers.create({
            //     name: 'Invoice Rosen',
            //     email: 'invoice.rosen@example.com',
            //     description: 'My first invoice',
            // });

            // const invoice = await stripe.invoices.create({
            //     customer: 'cus_PxX9V7KFEzZGAN',
            //     collection_method: 'send_invoice',
            //     days_until_due: 30,
            // });

            // const invoiceItem = await stripe.invoiceItems.create({
            //     customer: 'cus_PxX9V7KFEzZGAN',
            //     price: 'price_1P7cArF3AJJIi212hs1LCDwi',
            //     invoice: 'in_1P7c5eF3AJJIi212VqLe5jS5',
            // });

            // const invoice = await stripe.invoices.finalizeInvoice('in_1P7c5eF3AJJIi212VqLe5jS5');
            const invoice = await stripe.invoices.sendInvoice('in_1P7c5eF3AJJIi212VqLe5jS5');

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

