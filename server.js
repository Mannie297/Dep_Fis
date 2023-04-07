//sk_test_51MtHpXHM9HCFA8YG1J9UlQStEe72dI6muMzhPTrGpvTCZC7DSQNFidj8G8tT2Q6DtCz544nxewTJ7i5hIEYIlXGD00Pziu0hZ0
//coffee = price_1MtHwFHM9HCFA8YGtqzjbwpW
//sun glasses = price_1MtHxVHM9HCFA8YGjcSNpFTr
//Camera = price_1MtHyPHM9HCFA8YG1eyb9WgZ


const express = require('express');
var cors = require('cors');
const stripe = require('Stripe')('sk_test_51MtHpXHM9HCFA8YG1J9UlQStEe72dI6muMzhPTrGpvTCZC7DSQNFidj8G8tT2Q6DtCz544nxewTJ7i5hIEYIlXGD00Pziu0hZ0');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,

        /*line_items:[
            {
                price: 'price_1MtHwFHM9HCFA8YGtqzjbwpW',
                quantity: 3,
            }

        ],*/
        mode: 'payment',
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    });
    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, ()=> console.log("listening on port 4000"));
