// function to create invoice using async await 

async function generateInvoice(paymrentInfo) {

    // delay for 3 seconds
await new Promise(res=>setTimeout(res, 3000));

// payment info is invalid
if(!paymrentInfo || !paymrentInfo.status){
    throw new Error("payment info is invalid");
}

// retrun invoice
return {
// genrate random invoice id
    invoiceid: "INV" + Math.floor(Math.random() * 1000),
    orderId: paymrentInfo.orderId,
    amount: paymrentInfo.paidAmount,
    message: "Invoice generated successfully"
};

}
module.exports = generateInvoice;