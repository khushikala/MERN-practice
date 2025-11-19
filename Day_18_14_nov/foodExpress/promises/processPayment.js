//  function  to process payment using promises

function processPayment(order){

    return new Promise((resolve ,reject)=>{
setTimeout(()=>{

    if(!order){
        return reject("order not found");
    }

    resolve({
        status:"payment successful",
        paidAmount:order.price,
        orderId: order.id
    });

},3000);


    });
   
}
module.exports = processPayment;