
//  import  the all the three modules 
const fetchOrder = require("./callbacks/fetchOrder.js");
const processPayment = require("./promises/processPayment.js");
const generateInvoice = require("./asyncawait/generateInvoice.js");



// chosse order id 

const orderId = 3;

console.log("order processing started");


// step 1 fetching order using callback

fetchOrder(orderId,(err,order)=>{
    if(err){
        return console.log(err);
    }
// order fetched successfully
    console.log("order fetched successfully",order);

    // set 2  process payment using promisses
    processPayment(order)
    .then(paymentResult=>{
        console.log("payment processed successfully",paymentResult);
        return generateInvoice(paymentResult);
    })
    .then(invoice=>{
        console.log("invoice generated successfully",invoice);
    })
    .catch(error=>{
        console.log("payment failed",error);

    });
});