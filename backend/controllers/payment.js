const Stripe = require('stripe')

exports.payment=async(req,res,next)=>{

console.log(process.env.STRIPE_SECRET_KEY,'process.env.STRIPE_SECRET_KEY')
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    if (req.method != 'POST') return res.status(400)
    const { name, email, paymentMethod} = req.body
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method:paymentMethod,
      invoice_settings:{ default_payment_method:paymentMethod}
    })
    const product = await stripe.products.create({
      name:'Basic Subscription plan'
    }) 
    const subscription = await stripe.subscriptions.create({
      customer:customer.id,
      items:[
        {
          price_data:{
            currency:'USD',
            product:product.id,
            unit_amount:'500',
            recurring:{
              interval:'month'
            }
          }
        }
      ],
      payment_settings:{
        payment_method_types:['card'],
        save_default_payment_method:'on_subscription'
      },
      expand:['latest_invoice.payment_intent']
    })
    res.json({
      message:'Subcscription successful',
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId:subscription.id
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Internal Server Error'})
  }
}

