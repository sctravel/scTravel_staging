
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
//var test = require('./routes/test');
//var orders = require('./routes/orders');
//var orderConfir = require('./routes/orderConfir');
var mail=require('./node_modules/emailUtil');

var http = require('http');
var path = require('path');
var queryDB = require('./node_modules/queryDB');
var confirm=require('./node_modules/confirmationCodeGenerator');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('123'));
app.use(express.session());
app.use(express.methodOverride());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}app.get('/', function (req,res){
    res.redirect('/sctravel/spots.html');
});

app.get('/services/getAll/scenerySpots', function(req,res) {

    queryDB.getAllScenerySpots(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/offers', function(req,res) {

    queryDB.getAllOffers(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/routes', function(req,res) {

    queryDB.getAllRoutes(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/buses', function(req,res) {

    queryDB.getAllBuses(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/drivers', function(req,res) {

    queryDB.getAllDrivers(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/validSchedules', function(req,res) {

    queryDB.getAllValidSchedules(function(results){
        res.send(results);
    })
});
/*
app.get('/orders', orders.orders);

app.get('/users', user.list);

app.post('/orders', function (req,res){
         
         var a = req.body.orderlist;
         req.session.orderlist=a;
         res.redirect('/sctravel/orderReview.html');
         });

app.post('/preorder', function (req,res) {
         
         var preorders = req.body.preorders;
         
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
         order.order_status='1';
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
         
         
         
         
         });

app.get('/orderConfir',orderConfir.orderConfir);
app.post('/email', function(req,res){
         var mailOptions=req.body.mailOptions;
         mail.sendEmail(mailOptions,function(error, response){
                        if(error){
                        console.log(error);
                        }else{
                        console.log("Message sent: " + response.message);
                        res.send("ok");
                        }
                        });
         });
*/
http.createServer(app).listen(app.get('port'), function(){
                              console.log('Express server listening on port ' + app.get('port'));
                              });
