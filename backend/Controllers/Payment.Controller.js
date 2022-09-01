const { v4: uuidv4 } = require("uuid");
const nodeMailer = require("nodemailer");
const stripe = require("stripe")(
  "sk_test_51KzbuqSAsvHxyVvOB2FFVDtprZ0XlfU4bFG9WUNyEoHLg1pwrwIF7b60GOcrPiSwtq4u9IZkfCihvu9mg2fkUEml00G8LknT0o"
);

//twilio configurations
const twilio = require("twilio");
const accountSid = "ACd74c7e08d642e55bc309f67278e9885e";
const authToken = "df32d7889cb8e1d83ddd8914d2b0804e";
const client = new twilio(accountSid, authToken);
const twilioNumber = "+18045316798";

// const xx = "manulthisuraka@gmail.com";
const number = "+94772570000";

const makePayment = async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    sendEmail(customer.email);
    sendSms(number);
    const idempotencyKey = uuidv4();
    const charge = await stripe.paymentIntents.create(
      {
        amount: product.amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.description}`,
      },
      {
        idempotencyKey,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
    res.send(charge.receipt_url);
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  //res.json({error, status});
};

//email sending function
function sendEmail(email) {
  //create transporter object
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "spare.brothers@gmail.com",
      pass: "SpareBrothers",
    },
  });
  let mailOptions = {
    from: '"SpareBrothers" <spare.brothers@gmail.com>', // sender address
    to: email, // receiver email
    subject: "Your Purchase has been placed", // Subject line
    text: "Thank You for your payment. Your payment receipt has been sent to Your Email", // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("index");
  });
}
//sms sending function
function sendSms(number) {
  let msg =
    "Your Purchase has been placed. Your payment receipt has been sent to Your Email. Thank You for odering with Spare Brothers.";

  const textMessage = {
    body: msg, // message body
    to: number, // to reciver's number
    from: twilioNumber, // From a valid Twilio number
  };

  return client.messages
    .create(textMessage)
    .then(() => console.log(`sms success to ${number}`))
    .catch((error) =>
      console.error("There was an error while sending the sms:", error)
    );
}

module.exports = {
  makePayment,
};
