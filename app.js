
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var dateFormat = require('dateformat');
var alipay = require('alipayUtil.js');
var orders = require('./routes/orders');
var orderConfir = require('./routes/orderConfir');
var routes = require('./routes');
var mail=require('./node_modules/emailUtil');
var queryDB = require('./node_modules/queryDB');
var stringUtils = require('./node_modules/stringUtils');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var adminUtil = require('./node_modules/adminLogin');
var tableNames = require('./node_modules/tableNames');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.methodOverride());


/*********************************************************
 *Log4js configuration
 *********************************************************/
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024*1024*100,
            backups:3,
            category: 'normal'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO, format:':method :url'}));

exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}


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
// Order: insert data record:
app.get('/services/admin/InsertOrder/:tableColumnNames/:values', function(req,res) {

    var tableColumnNames = req.params.tableColumnNames;
    console.log("Parameter: " + tableColumnNames);

    var values = req.params.values;
    console.log("Parameter: " + values);

    queryDB.insertRecord(tableNames.orderTable ,tableColumnNames, values, function(results){
        res.send(results);
    })
});


// Order: lookup by confirmation number
app.get('/services/admin/GetCustomersBasedOnConfirmation/:confirmNum', function(req,res) {
    var confirmNum = req.params.confirmNum;
    console.log("Parameter: " + confirmNum);
    queryDB.getCustomersFromConfirmationNumber(confirmNum,function(results){
        res.send(results);
    })
});


//Order: look up by order number
app.get('/services/admin/GetCustomersBasedOnOrder/:orderNum', function(req,res) {
    var orderNum = req.params.orderNum;
    console.log("Parameter: " + orderNum);
    queryDB.getCustomersFromOrderNumber(orderNum,function(results){
        res.send(results);
    })
});



//Customer:  lookup by name
app.get('/services/admin/GetCustomersBasedOnName/:name', function(req,res) {
    var name = req.params.name;
    console.log("Parameter: " + name);
    queryDB.getCustomersFromName(name,function(results){
        res.send(results);
    })
});

//Customer: lookup by phone
app.get('/services/admin/GetCustomersBasedOnPhoneNumber/:phone', function(req,res) {
    var phone = req.params.phone;
    console.log("Parameter: " + phone);
    queryDB.getCustomersFromPhoneNumber(phone,function(results){
        res.send(results);
    })
});

// Customer: insert data record:
app.get('/services/admin/InsertCustomer/:tableColumnNames/:values', function(req,res) {

    var tableColumnNames = req.params.tableColumnNames;
    console.log("Parameter: " + tableColumnNames);

    var values = req.params.values;
    console.log("Parameter: " + values);

    queryDB.insertRecord(tableNames.customerTable ,tableColumnNames, values, function(results){
        res.send(results);
    })
});


//Ticket: look up by ticket number
app.get('/services/admin/GetCustomersBasedOnTicket/:ticketNum', function(req,res) {
    var ticketNum = req.params.ticketNum;
    console.log("Parameter: " +ticketNum);
    queryDB.getCustomersFromTicketNumber(ticketNum,function(results){
        res.send(results);
    })
});

// Ticket: insert data record:
app.get('/services/admin/InsertTicket/:tableColumnNames/:values', function(req,res) {

    var tableColumnNames = req.params.tableColumnNames;
    console.log("Parameter: " + tableColumnNames);

    var values = req.params.values;
    console.log("Parameter: " + values);

    queryDB.insertRecord(tableNames.sc_sku_tickets ,tableColumnNames, values, function(results){
        res.send(results);
    })
});

//Ticket : delete\Disable ticket
app.get('/services/admin/InsertTicket/:tableColumnNames/:values', function(req,res) {

    var tableColumnNames = req.params.tableColumnNames;
    console.log("Parameter: " + tableColumnNames);

    var values = req.params.values;
    console.log("Parameter: " + values);

    queryDB.insertRecord(tableNames.sc_sku_tickets ,tableColumnNames, values, function(results){
        res.send(results);
    })
});

// Routes: insert data record:
app.get('/services/admin/InsertRoutes/:tableColumnNames/:values', function(req,res) {

    var tableColumnNames = req.params.tableColumnNames;
    console.log("Parameter: " + tableColumnNames);

    var values = req.params.values;
    console.log("Parameter: " + values);

    queryDB.insertRecord(tableNames.routeTable ,tableColumnNames, values, function(results){
        res.send(results);
    })
});




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

/********************************************************************
 * AdminLogin methods
 ********************************************************************/
passport.use('local', new LocalStrategy(
    function (username, password, done) {

        adminUtil.manualLogin(username,password, function(error,results){
            console.dir(results);
            if(error) {
                return done(null, false, { message: 'Internal error.' });
            }
            if(results.isAuthenticated == true ) {
                return done(null, {username : username} );
            } else {
                return done(null, false, { message: results.errorMessage });
            }
        });
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user.username);//可以通过数据库方式操作
});

passport.deserializeUser(function (username, done) {//删除user对象
    done(null, {username:username} );//可以通过数据库方式操作
});

app.get('/adminLogin', function (req, res) {
    console.dir(req.user);
    res.redirect('/sctravel/adminLogin.html');
});

app.get('/admin', isLoggedIn, function (req, res) {
    console.dir(req);
    res.render('admin.ejs',{title: 'res vs app render', username : req.user.username }  );
});

app.get('/queryspots', function(req,res){

    res.render('query_spots.ejs');
});


//app.all('/users', isLoggedIn);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/adminLogin',
    passport.authenticate('local',
        { successRedirect: '/admin',
            failureRedirect: '/adminLogin',
            failureFlash: true })
);

http.createServer(app).listen(app.get('port'), function(){
                              console.log('Express server listening on port ' + app.get('port'));
                              });


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.dir(req.user);
        return next();
    }

    //
    res.redirect("/adminLogin");
}
