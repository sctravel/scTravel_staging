exports.orders = function(req, res){
    console.log("order.js");
    console.log("OrderList:" + req.session.orderlist);
    res.send(req.session.orderlist);
};

var queryDB = require('../node_modules/queryDB');

exports.placeOrder = function(req,res) {

        var returnObject={};


        var preorders = req.body.preorders;

        var userInfo = preorders.userInfo;

        var confirmTextInSession = req.session.confirmText;
        var confirmText = preorders.confirmText;
        console.log("confirmText-"+confirmText+"; confirmTextInSession-"+confirmTextInSession);

        if(confirmText != confirmTextInSession) {
            returnObject.hasError = true;
            returnObject.errorMessage = "验证码不正确,请重新输入！";
            res.send(returnObject);
            return;
        }

        var orderInfoArray= {};

        console.dir(userInfo);
        console.log("preorders=" + preorders.rows.length);

    orderInfoArray.vouchersArray=[];


        for(var i = 0; i < preorders.rows.length-1; i++) {

            var order = {};
            var row = preorders.rows[i]
            orderInfoArray.vouchersArray[i] = {};

            orderInfoArray.vouchersArray[i].offerId = preorders.offers[i];
            orderInfoArray.vouchersArray[i].skuId = preorders.routes[i];
            orderInfoArray.vouchersArray[i].scheduleId = preorders.schedules[i];
            console.log(preorders.schedules[i]);
            orderInfoArray.vouchersArray[i].validDate = preorders.rows[i].cell[3];
            orderInfoArray.vouchersArray[i].quantity = preorders.rows[i].cell[5];
            orderInfoArray.vouchersArray[i].offerSubtotalAmount = preorders.rows[i].cell[7];

        }

         orderInfoArray.totalAmount=preorders.total_amount;


        var result ={};

        var handleOrder=function(number) {
         /*   if(number==0) {
                isSuccess=false;
                console.log("handle order failed");
            }
            if(number==1)
            {
                var confirCode = confirmationCode;
                req.session.confirCode = confirCode;

                res.send("ok");
            }*/
            req.session.results=number;
            res.send(number);


        }

        queryDB.placeOrder(userInfo,orderInfoArray,handleOrder);


}