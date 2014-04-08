exports.orders = function(req, res){
    console.log("order.js");
    console.log("OrderList:" + req.session.orderlist);
    res.send(req.session.orderlist);
};

exports.placeOrder = function(req,res) {

        var preorders = req.body.order;

        var userInfo = preorders.userInfo;

        var orderInfoArray= [];

        console.log("preorders=" + preorders.rows.length);

        for(var i = 0; i < preorders.rows.length-1; i++) {

            var order = {};
            var row = preorders.rows[i]

            order.spot_id = row.spot_id;
            console.log("spot_id=" + row.spot_id);
            order.departure= row.cell[0];
            order.valid_date= row.cell[2];
            order.time_slot = row.cell[3];
            order.quantity=row.cell[4];
            //order.price = preorders.row[i].cell[3];
            order.order_status='booked';
            order.total_amount = row.cell[6];

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

        var confirmationCode=confirm.generateConfirmationCode();
        queryDB.placeOrder(userInfo,orderInfoArray,confirmationCode,'1',handleOrder);


}