
// function  fetchinf an order from mock database

function fetchOrder(orderId , callback){
// fake database
    setTimeout(()=>{
        const order = {
            1:{id:1 , item :"lasagna", price: 200 },
            2:{id:2 , item :"pasta", price: 150 },
            3:{id:3 , item : "Paneer LIzzat", price : 290},
            4:{id:4 , item :"Garlic naan", price: 65 }
        };

        // if order is not found
        if(!order[orderId]){
            return callback("order not found");
        }

        // if found return the order
        else{
            return callback(null , order[orderId]);
        }
        },3000);
    }
    // export the function so index .js can use it
module.exports = fetchOrder;