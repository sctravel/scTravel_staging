var queryDB = require('../node_modules/queryDB');
exports.orderConfir = function(req, res){
    var confirCode = req.session.confirCode;
    console.log("/orderConfir:" + confirCode);
    queryDB.checkOrder(confirCode, function(results){
        console.log("orderConfir:" + results);
        var orders = {}
        orders.confir = confirCode;
        orders.preorders = results;
        console.log(orders);
        res.send(orders);
    });
};