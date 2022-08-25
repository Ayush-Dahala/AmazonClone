const functions = require("firebase-functions");
const express=require('express'); 
const cors=require('cors');
const { response } = require("express");
const stripe=require('stripe')('sk_test_51LMoiESDUxQMa4Sonq47icjSZfXp7zTvN8J3UacRmFNekSz4tmkm7rgKvQoeE0cS8vAnYoaepmi8O9s4WJX06eMH00lHKeOYSD')
//API
//App config
const app=express()
//Middlewares
app.use(cors({origin:true}));
app.use(express.json());
//API routes
app.get('/',(request,response)=>response.status(200).send('hello world'))
app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;
    console.log('Payment Request Received BOOM',total)
    const paymentIntern=await stripe.paymentIntern.create({
        amout:total,
        currency:"usd"
    });
    response.status(201).send({
        clientSecret: paymentIntern.client_secret,
    })
})
//Listen command
exports.api =functions.https.onRequest(app)


