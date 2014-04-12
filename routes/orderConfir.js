var queryDB = require('../node_modules/queryDB');
exports.orderConfir = function(req, res){
    var results = req.session.results;
    var confirCode = results.confirmCode;

    console.log("/orderConfir:" + confirCode);

    queryDB.getVouchersFromConfirmationCode(confirCode, function(results){
        console.log("orderConfir:" + results);
        var orders = {}
        orders.confir = confirCode;
        orders.preorders = results;
        console.log(orders);
        res.send(orders);
    });
};