import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51OEqT5SHKAp1IV0B10FWgzCOFDryZqGYyxVHKEpJbCChoNvv0pIV6kBGBPHkFBAsaYjmgxUgDGdWXHKMq54My5zk00ZVz7aOEi');

function App() {
    return (
        <div className="App">
            <h1>Stripe EMI Example</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

export default App;
