const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode' : 'sandbox', //sandbox or live 
  'client_id': 'AWJxlD9QLPsUQ9phUtxpXNelvDjwVx5XhzxuR4bvPg4gm4444-5Jv4QVUWDTPeVTAaLQ0zYmliHFoD4C',
  'client_secret': 'EGVQj8V7MsrBfN4zv-P4a1ft83vub_E62c7gMBzydqrFqTGCSioUtTEOdU0CWWUm2TSIUiBo8BugMTly'
});


router.post('/', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "https://reliable-begonia-d22a9e.netlify.app/pay/success",
        "cancel_url": "https://reliable-begonia-d22a9e.netlify.app//pay/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Intger Algorithm",
                "sku": "001",
                "price": "50.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "50.00"
        },
        "description": "An Algorithm video"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "50.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.render("success");
    }
});
});

router.get('/cancel', (req, res) => {
  res.render("err")
});



module.exports = router