
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var dateFormat = require('dateformat');
var alipay = require('alipayUtil.js');
//var user = require('./routes/user');
//var test = require('./routes/test');
var orders = require('./routes/orders');
var orderConfir = require('./routes/orderConfir');
var routes = require('./routes');
var mail=require('./node_modules/emailUtil');
var queryDB = require('./node_modules/queryDB');
var confirm=require('./node_modules/confirmationCodeGenerator');
var stringUtils = require('./node_modules/stringUtils');


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
};

//Home page
app.get('/', function (req,res){
    res.redirect('/sctravel/spots.html');
});


/*************************************************************
 * Data Services using http GET method
 *************************************************************/
app.get('/services/getAll/scenerySpots', function(req,res) {

    queryDB.getAllScenerySpots(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/startSpots', function(req,res) {

    queryDB.getAllStartSpots(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/routesByStartSpot', function(req,res) {

    queryDB.getRoutesFromStartSpots(function(results){
        res.send(results);
    })
});

app.get('/services/getAll/offersByRoute', function(req,res) {

    queryDB.getOffersFromRouteId(function(results){
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

app.get('/services/search/orders', function(req,res){
    //console.dir(req);
    var confirmCode = req.query.confirmCode;
    var customerInfo = req.query.customerInfo;

    console.log("ConfirmCode-"+confirmCode);
    console.log("CustomerInfo-"+customerInfo);
    if(confirmCode) {
        console.log("Searching orders by confirmCode-"+confirmCode);
        queryDB.getVouchersFromConfirmationCode(confirmCode,function(results){
            console.log("Search order by confirmation code!");
            console.dir(results);
            res.send(results);
        });
    } else if(customerInfo) {
        console.log("Searching orders by customerInfo");
        queryDB.getVouchersFromCustomerInfo(customerInfo,function(results){
            console.log("Search order by customer information!");
            console.dir(results);
            res.send(results);
        });
    }
});
/********************************************************************
 * Actions using http POST methods
 ********************************************************************/
/*
app.post('/services/common/email', function(req,res){
    var mailOptions=req.body.mailOptions;
    mail.sendEmail(mailOptions,function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: " + response.message);
            res.send("ok");
        }
    });
});*/
app.post('/orders', function (req,res){

    var a = req.body.orderlist;
    req.session.orderlist=a;
    res.redirect('/sctravel/orderReview.html');
});

app.get('/orders', orders.orders);


app.post('/preorder', orders.placeOrder);
app.get('/orderConfir',orderConfir.orderConfir);

app.post('/sctravel/alipayto',alipay.alipayto);
app.post('/paynotify',alipay.paynotify);
app.get('/payreturn',alipay.payreturn);

http.createServer(app).listen(app.get('port'), function(){
                              console.log('Express server listening on port ' + app.get('port'));
                              });
