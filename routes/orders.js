exports.orders = function(req, res){
    console.log("order.js");
    console.log("OrderList:" + req.session.orderlist);
    res.send(req.session.orderlist);
};

var queryDB = require('../node_modules/queryDB');

exports.placeOrder = function(req,res) {

<<<<<<< HEAD

        preorders = req.body.preorders;
=======
        var preorders = req.body.preorders;
>>>>>>> 8d765b505a3e951a6ff29cf970e3a60f096b6511

        var userInfo = preorders.userInfo;

        var orderInfoArray= [];

        console.log("preorders=" + preorders.rows.length);

        for(var i = 0; i < preorders.rows.length-1; i++) {

            var order = {};
            var row = preorders.rows[i]
            order.start= row.cell[0];
            order.end= row.cell[1];

            order.type= row.cell[2];
            order.validDate = row.cell[3];
            order.time=row.cell[4];
            //order.price = preorders.row[i].cell[3];
<<<<<<< HEAD
            order.amount=row.cell[5];
            order.price = row.cell[6];
            order.subtotal=row.cell[7];
            order.offerId = row.
            console.log(order);
=======
            order.order_status='1';
            order.total_amount = row.cell[6];

>>>>>>> 8d765b505a3e951a6ff29cf970e3a60f096b6511
            orderInfoArray[i]=order;
        }
        var result ={};
        for(var i =0; i < orderInfoArray.length; i++) {

            console.log(orderInfoArray[i]);
        }

        var handleOrder=function(number) {
            if(number==0) {
                isSuccess=false;
                console.log("handle order failed");
            }
            if(number==1)
            {
                var confirCode = confirmationCode;
                req.session.confirCode = confirCode;

                res.send("ok");
            }


        }

        queryDB.placeOrder(userInfo,orderInfoArray,handleOrder);


}