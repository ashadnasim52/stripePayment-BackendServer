const express = require("express");
const stripe = require("stripe")("sk_test_JEvtUTIMlf9AcB5xEQd2QrJP000vVWaJ8C");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");

const app = express();

app.set("view engine", ejs);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.post("/charge", (req, res) => {
  console.log(req.body);
  const amount = 2500; //           ashad
  stripe.customers
    .create({
      email: req.body.email,
      source: req.body.stripeToken
    })
    .then(customer => {
      stripe.charges.create({
        amount,
        description: "web devlopment Ebook",
        currency: "usd",
        customer: customer.id
      });
    })
    .then(charge => {
      res.render("success.ejs");
    });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(8000, () => {
  console.log("server is running at 8000");
});
