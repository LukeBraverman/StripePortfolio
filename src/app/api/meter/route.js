import {NextResponse} from "next/server";
import Stripe from "stripe"
const stripe =  new Stripe('sk_test_51P1DthF3AJJIi2128kj61E2LkDbZ36Ap1iyCgTKNiFjlHiPXhooMd4DEdq5AxPDyChAaNYlTt269D8bvucwBBErl000AvkkJ7H')
/* Collect card - use collected card */
export async function GET(req) {
    if (req.method === 'GET') {
        try {

            // const meter = await stripe.billing.meters.create({
            //     display_name: 'Alpaca AI tokens',
            //     event_name: 'alpaca_ai_tokens',
            //     default_aggregation: {
            //         formula: 'sum',
            //     },
            //     customer_mapping: {
            //         event_payload_key: 'stripe_customer_id',
            //         type: 'by_id',
            //     },
            //     value_settings: {
            //         event_payload_key: 'value',
            //     },
            // });

            // const meterEvent = await stripe.billing.meterEvents.create({
            //     event_name: 'alpaca_ai_tokens',
            //     payload: {
            //         stripe_customer_id: 'cus_PxX9V7KFEzZGAN',
            //         value: '1',
            //     },
            // });

            // const price = await stripe.prices.create({
            //     currency: 'gbp',
            //     unit_amount: 4,
            //     billing_scheme: 'per_unit',
            //     transform_quantity: {
            //         divide_by: 1000,
            //         round: 'up',
            //     },
            //     recurring: {
            //         usage_type: 'metered',
            //         interval: 'month',
            //         meter: 'mtr_test_61QH44g0kTsYvDGSm41F3AJJIi212Gky',
            //     },
            //     product_data: {
            //         name: 'Alpaca AI tokens',
            //     },
            // });

            // const subscription = await stripe.subscriptions.create({
            //     customer: 'cus_PxX9V7KFEzZGAN',
            //     items: [
            //         {
            //             price: 'price_1P7gAqF3AJJIi212Oqa2ywZs',
            //         },
            //     ],
            //     expand: ['pending_setup_intent'],
            // });

            // const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
            //     customer: 'cus_PxX9V7KFEzZGAN',
            // });

            // var date = new Date('April 20, 2024');
            //
            // date.setHours(0, 0, 0, 0);
            //
            // var timestamp = date.getTime();
            //
            // date.setHours(23, 59, 0, 0);
            // var timestamp2 = date.getTime();
            //
            // const meterEventSummaries = await stripe.billing.meters.listEventSummaries(
            //     'mtr_test_61QH44g0kTsYvDGSm41F3AJJIi212Gky',
            //     {
            //         customer: 'cus_PxX9V7KFEzZGAN',
            //         start_time: timestamp,
            //         end_time: timestamp2,
            //     }
            // );
            // console.log('999', meterEventSummaries)

            // const price = await stripe.prices.create({
            //     nickname: 'Project Volume Pricing',
            //     tiers: [
            //         {
            //             unit_amount: 700,
            //             up_to: 5,
            //         },
            //         {
            //             unit_amount: 650,
            //             up_to: 10,
            //         },
            //         {
            //             unit_amount: 600,
            //             up_to: 'inf',
            //         },
            //     ],
            //     currency: 'gbp',
            //     recurring: {
            //         interval: 'month',
            //         usage_type: 'metered',
            //     },
            //     product: 'prod_PxfeAOljAIXS5j',
            //     tiers_mode: 'volume',
            //     billing_scheme: 'tiered',
            //     expand: ['tiers'],
            // });

            // const subscription = await stripe.subscriptions.create({
            //     customer: 'cus_Px74OBa39z25S1',
            //     items: [
            //         {
            //             price: 'price_1P7kgTF3AJJIi21224c7xuL7',
            //         },
            //     ],
            //     expand: ['pending_setup_intent'],
            // });
            //
            // const price = await stripe.prices.create({
            //     nickname: 'USD and OTHERS Per-minute pricing',
            //     // tiers: [
            //     //     {
            //     //         unit_amount: 500,
            //     //         up_to: 5,
            //     //     },
            //     //     {
            //     //         unit_amount: 400,
            //     //         up_to: 10,
            //     //     },
            //     //     {
            //     //         unit_amount: 100,
            //     //         up_to: 'inf',
            //     //     },
            //     // ],
            //     unit_amount:8500,
            //     currency: 'usd',
            //     currency_options: {
            //         eur: {
            //             unit_amount: 9000,
            //         },
            //         jpy: {
            //             unit_amount: 12000,
            //         },
            //     },
            //     recurring: {
            //         interval: 'month',
            //         usage_type: 'metered',
            //     },
            //     product: 'prod_PxfeAOljAIXS5j',
            //     // tiers_mode: 'graduated',
            //     // billing_scheme: 'tiered',
            //     expand: ['tiers'],
            // });

            // const subscription = await stripe.subscriptions.create({
            //     customer: 'cus_Px74OBa39z25S1',
            //     items: [
            //         {
            //             price_data: {
            //                 unit_amount: 5000,
            //                 currency: 'gbp',
            //                 product: 'prod_PxfeAOljAIXS5j',
            //                 recurring: {
            //                     interval: 'month',
            //                 },
            //             },
            //         },
            //     ],
            //
            //     expand: ['pending_setup_intent'],
            // });

            // const subscription = await stripe.subscriptions.create({
            //     customer: 'cus_Px74OBa39z25S1',
            //     items: [
            //         {
            //             price: 'price_1P7lXOF3AJJIi212u1mr5ZJA',
            //         },
            //     ],
            //     expand: ['pending_setup_intent'],
            // });


            // const meterEvent = await stripe.billing.meterEvents.create({
            //     event_name: 'graduate',
            //     payload: {
            //         stripe_customer_id: 'cus_Px74OBa39z25S1',
            //         value: '4',
            //     },
            // });

            const price = await stripe.prices.retrieve(
                'price_1P7lb8F3AJJIi212rO4zrCZz',
                {
                    expand: ['currency_options'],
                }
            );

            console.log(price)

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

