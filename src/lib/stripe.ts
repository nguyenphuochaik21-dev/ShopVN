import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function createCheckoutSession({
  items,
  successUrl,
  cancelUrl,
}: {
  items: Array<{
    name: string
    price: number
    quantity: number
    image?: string
  }>
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'vnd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price), // Stripe uses smallest currency unit
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}

export async function retrieveCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId)
}

export async function createRefund(paymentIntentId: string) {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
  })
}
