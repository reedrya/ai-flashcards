import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const { priceId } = await req.json(); // Extract priceId from the request body

    if (!priceId) {
        return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';  // Fallback to localhost for development

    const params = {
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
            {
                price: priceId,  // Dynamically use the price ID sent from the frontend
                quantity: 1,
            },
        ],
        success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    try {
        const checkoutSession = await stripe.checkout.sessions.create(params);
        return NextResponse.json({ id: checkoutSession.id });  // Return the session ID to the frontend
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });  // Return the error message to the frontend
    }
}
