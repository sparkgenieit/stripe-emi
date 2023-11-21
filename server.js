const express = require('express');
const stripe = require('stripe')('sk_test_51OEqT5SHKAp1IV0B1R3LaBmjuF0TDifEGXcBSvSZUNoGSMPfE2o9nbT6TqBCobb2VRdP8i3Ke8Fp2paRZMTZ7qSy00UdV5trEU');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Define a route to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, payment_method } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method,
            payment_method_options: {
                card: {
                    mandate_options: {
                        interval: 'month', // or 'interest_free', depending on your needs
                        interval_count:'1',
                        reference: 'YOUR_UNIQUE_REFERENCE',
                        amount_type:'fixed',
                        amount:'20',
                        start_date:Math.floor(Date.now() / 1000),
                        supported_types:['india']

                    },
                },
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error creating payment intent' });
    }
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
