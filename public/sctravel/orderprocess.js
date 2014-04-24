$("#preorder").click(function() {
                     
                     if(orders !==null) {
                     
                     
                     var userInfo= {};
                     
                     userInfo.customerName = $('#name').val();
                     userInfo.email = $('#email').val();
                     userInfo.mobilePhone = $('#phone').val();
                     //userInfo.order_total_amount = orders.total_amount;
                     orders.userInfo = userInfo;
                     console.log("userName-"+userInfo.customerName+"; email-"+userInfo.email);
                     $.post('/preorder', {"preorders" : orders},  function(data){
                            console.log("Preorder finished");
                            console.dir(data);
                            if(data.isSuccess==true){
                                //req.session.results = data;
                                window.location.href="/sctravel/finalOrder.html";
                             }
                            });
                     }
                
});

$("#pay").click(function() {

    var r=confirm("您即将进入网上银行付款");
    if(r == true) {

        window.location.href="http://www.icbc.com.cn";

    }else {

    }

});

$("#cancel").click(function() {

    var r=confirm("你确定取消吗？");
    if(r == true) {

        window.location.href="/";

    }else {

    }

});


$('#preorder').click(function(){

    var name = $('#name').val();
    var phone = $('#phone').val();
    var email = $('#name').val();

    userInfo = {};
    userInfo.name = name ;
    userInfo.phone = phone;
    userInfo.email = email;



});

$('#paybutton').click(function(){


    console.log("pay to alipay!");

    $.post('/sctravel/alipayto', {"orderInfo" : t.preorders[0]},  function(data){
        console.log("redirect to alipay finished");
        console.dir(data);
    });


});

$(function(){
    orders={};
    $.get( "/orders", function(data) {

             orders = data;
        });

    jQuery(document).ready(function(){
        jQuery("#list2").jqGrid({ url:'/orders',
            datatype: "json",
            colNames:['出发地','景点','票种','日期','时间','人数','价格','总价'],
            colModel:[  {name:'start',index:'start',align:'right'},
                        {name:'end',index:'end', align:"right"},
                         {name:'type', index:'type', align:"right" },
                        {name:'date',index:'date', align:"right"},
                        {name:'time',index:'time', align:"right"},
                        {name:'amount',index:'amount', align:"right"},
                        {price:'price',index:'price', align:"right"},
                        {name:'subtotal',index:'subtotal', align:"right"}

            ]
        });
    });
})