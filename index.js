const express = require('express');
const axios = require('axios');
const qs = require('qs');

const app = express();

// bKash API endpoint
const API_URL = 'https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/search';

// API credentials
const APP_KEY = '<your_app_key>';
const APP_SECRET = '<your_app_secret>';

// endpoint to get transaction details
app.get('/transaction/:phone_number', (req, res) => {
    const phone_number = req.params.phone_number;
    const start_date = req.query.start_date || '2022-02-01';
    const end_date = req.query.end_date || '2022-02-15';

    // API request data
    const requestData = {
        app_key: APP_KEY,
        app_secret: APP_SECRET,
        query: phone_number,
        from: start_date,
        to: end_date
    };

    // set up axios instance
    const instance = axios.create({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    // make API call
    instance.post(API_URL, qs.stringify(requestData))
        .then(response => {
            // handle API response
            res.send(response.data);
        })
        .catch(error => {
            // handle API error
            res.status(500).send(error.response.data);
        });
});

// start server
app.listen(4000, () => {
    console.log('Server started on port 3000');
});
