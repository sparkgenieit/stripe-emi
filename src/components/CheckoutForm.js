import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        setLoading(true);
    
        try {
            // Create a PaymentMethod
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
    
            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }
    
            // Send the PaymentMethod ID to your server
            const response = await axios.post('http://localhost:3001/create-payment-intent', {
                amount: 1000, // Amount in cents
                currency: 'usd',
                payment_method: paymentMethod.id,
            });
    
            // Confirm the payment on the client side with EMI option
            const result = await stripe.confirmCardPayment(response.data.clientSecret, {
                payment_method: paymentMethod.id,
              
                
            });
    
            if (result.error) {
                console.error(result.error);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.error(error);
        }
    
        setLoading(false);
    };
    
    

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <CardElement className="card-element" />
            <button type="submit" disabled={loading} className="pay-button">
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;
