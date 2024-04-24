
import { NextResponse } from 'next/server'

export async function GET(request) {
    return NextResponse.json({ key: process.env.STRIPE_SECRET_KEY })
}
