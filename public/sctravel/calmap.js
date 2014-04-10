function compute_total(){
   
    subs = $('.subtotal');
    var total = 0;
    for(var i = 0; i <subs.length; i ++ ) {

        if(subs[i].value == "") {

            sub_total = 0;
        }else {

            sub_total =subs[i].value;
        }

        total = total + parseInt(sub_total);

        if(total==0){

            $("#buyButton").attr('disabled','disabled');
        }else {

            $("#buyButton").removeAttr('disabled');
        }


    }
    $('#total').prop('value', total);

}
function init(lineNum){
    var line_Num = lineNum;

    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        regional: 'zh-CN'
    });




    date = new Date();

    var n = date.getDay();

    endDate = new Date();

    endDate.setDate(endDate.getDate() + 14);

    startDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();


    $('#date_' + line_Num).datepicker( "option", "minDate",startDate);
    $('#date_' + line_Num).datepicker( "option", "maxDate", endDate);

    $.ajax({url:"/services/getAll/startSpots", success:function(results) {

        var startSpots = results;
        var option = "<option value =  0>" +  "请选择" + "</option>";

        $(option).appendTo($('#start_' + line_Num));
        for(var startSpotIndex in startSpots) {

          var  startSpot = startSpots[startSpotIndex];


            var option = "<option value = "  +  startSpot.spot_id + ">" +  startSpot.spot_name  + "</option>"

            $(option).appendTo($('#start_' + line_Num));
        }

    }});

    start_id = '#start_' + line_Num;
    $(start_id).change(function() {


        var id = this.id;
        var curr_lineNum= id.substring(id.indexOf('_') + 1);

       delete picked_offers[curr_lineNum] ;
        delete picked_routes[curr_lineNum] ;
        var end_id = '#end_'+ curr_lineNum;

        $(end_id).empty();

        var option = "<option value =  0>" +  "请选择" + "</option>";

        $(option).appendTo($(end_id));

        $.ajax({url:"/services/getAll/routesByStartSpot", success:function(results) {

            routes = results;
            startSpot_id = $('#start_' + curr_lineNum).val();

            route = routes[startSpot_id];
            for( var i=0; i < route.length; i++) {


                var end_spot_name = route[i].to_label;

                var option = "<option value = "  +  route[i].route_id + ">" +  end_spot_name  + "</option>"

                $(option).appendTo($(end_id));

            }

        }});


    });
    end_id = '#end_' + line_Num;
    $(end_id).change(function(){
        var id = this.id;
        var curr_lineNum= id.substring(id.indexOf('_') + 1);
        delete picked_offers[curr_lineNum] ;
        delete picked_routes[curr_lineNum] ;
        var type_id = '#type_'+ curr_lineNum;
        $(type_id).empty();

        var option = "<option value =  0>" +  "请选择" + "</option>";

        $(option).appendTo($(type_id));
        $.ajax({url:"/services/getAll/offersByRoute", success:function(results) {
            route_id =  $('#end_' + curr_lineNum).val();
            offers = results;
            offer = offers[route_id];
            for (var i =0; i < offer.length;i ++) {


                var s= offer[i].offer_name.indexOf("(");
                type='只含车票';
                if(s>=0){

                    var e = offer[i].offer_name.indexOf(")");

                    if(e>0) {
                        type =  offer[i].offer_name.substring(s+1,e);

                    }
                }
                var option = "<option value = "  +  i + ">" +  type  + "</option>"

                $(option).appendTo($(type_id));

            }

        }});
    });

    $('.type').change(function(){

        id = this.id;
        curr_lineNum = id.substring(id.indexOf("_")+1);


        route_id = $('#end_' +curr_lineNum).val();

        offer = offers[route_id];

        type_id = "#" + id;

        var price = offer[$(type_id).val()].offer_price;

        var price_id = "#price_" + curr_lineNum
        $(price_id).attr("value",price );

		var amount_id = "#amount_" + curr_lineNum
        num = $(amount_id).val();
        
		var subtotal = price * num;
        subtotal_id = "#subtotal_" + curr_lineNum;
        $(subtotal_id).attr("value", subtotal);


        picked_offers.push(offer[$(type_id).val()].offer_id);

        picked_routes.push(offer[$(type_id).val()].route_id);
      //  picked_offers.push(offer[$(type_id).val()]);
        compute_total();

    });


  date_id = "#date_" +line_Num;
    $(date_id).change(function(){
        id = this.id;

        curr_lineNum = id.substring(id.indexOf('_') + 1);

        var time_id = "#time_" + curr_lineNum;
        $(time_id).empty();
        var option = "<option value =  0>" +  "请选择" + "</option>";

        $(option).appendTo($(time_id));

        $.ajax({url:"/services/getAll/validSchedules", success:function(results) {
            var end_id = "#end_" + curr_lineNum;
            var route_id = $(end_id).val();
            schedules = results;
            schedule = schedules[route_id];
            var date_id = "#date_" + curr_lineNum;


            for (var i =0; i < schedule.length;i ++) {

                if( schedule[i].schedule_date == null || (schedule[i].schedule_date == $(date_id).val())){

                    var option = "<option value = "  +  schedule[i].schedule_id + ">" +  schedule[i].departure_time  + "</option>"

                    $(option).appendTo($(time_id));
                }
            }
        }});

    });

    $( ".amount" ).change(function() {
        id = this.id;
        curr_lineNum = id.substring(id.indexOf("_")+1);

        var num = $(this).val();

        price_id = "#price_" + curr_lineNum;
        var price = $(price_id).val();
        var subtotal = price * num;
        subtotal_id = "#subtotal_" + curr_lineNum;
        $(subtotal_id).attr("value", subtotal);

        compute_total();

    });

    $( ".time" ).change(function() {

        var scheduleId  =  $(this).val();

        picked_schedules.push(scheduleId);

    });




}

$("#buyButton").click(function() {

    var start = $('.start option:selected');
    var end  = $('.end option:selected');
    var type = $('.type option:selected');

    var date = $('.datepicker');
    var time = $('.time option:selected');
    var amount= $('.amount');

    var price = $('.price');
    var subtotal= $('.subtotal');
    var total = $('.total');

    var orders_picked = [];
    for(var i = 0; i < start.length;i ++){
        var order = { "cell" : [start[i].text, end[i].text, type[i].text, date[i].value, time[i].text, amount[i].value, price[i].value, subtotal[i].value ]};
        orders_picked.push(order);

    }

     var order_total = {"cell": [' ',' ',' ',' ',' ',' ','合计',total.val()]};
    orders_picked.push(order_total);
     orderlist= {"rows" : orders_picked};
    orderlist.offers = picked_offers;
    orderlist.routes = picked_routes;
    orderlist.schedules = picked_schedules;

       orderlist.total_amount=total.val();
    //var total = { "total" : total[0].value}
    //orders.push(total);

     $.post('/orders', {"orderlist" : orderlist},  function(data){

         window.location.href="/sctravel/orderReview.html";
     });



 });
 
 $("#addButton").click(function(){
     lineNum ++;

     var start_id =   'start_' + lineNum ;

     var end_id = 'end_' + lineNum;

     var type_id = 'type_' + lineNum;
     var date_id = 'date_' + lineNum;
     var time_id = 'time_' + lineNum;
     var amount_id = 'amount_' + lineNum;
     var price_id = 'price_' + lineNum;
     var subtotal_id = 'subtotal_' + lineNum;

  $("#buyTicket").append("<div class=\"row-fluid order new\" >" +
    " <div  class=\"span2\"><bold>出发地：</bold><select id=\"" +start_id + "\" class=\"start\" style=\"width:140px;\"></select></div>"
     +  " <div  class=\"span2\"><bold>景点：</bold><select id=\"" +end_id + "\" class=\"end input-small\" ></select></div>"
     +"<div  class=\"span1\" ><bold>票种：</bold><select id=\"" +type_id + "\" class=\"type input-small\"  ></select></div>"
     + " <div  class=\"span2\"><bold>日期：<input  id = \"" +date_id + "\"class=\"datepicker input-small\" type=\"text\"></input></bold></div>"
     + " <div  class=\"span2\"><bold>时间：</bold><select id = \"" +time_id + "\" class=\"time input-small\"></select></div>"
     + " <div  class=\"span2\"><bold>人数：</bold><input id= \"" +amount_id + "\" type=\"text\" class=\"amount input-small\" width=\"50px\" value=\"1\"/></div>"
     + " <div  class=\"span2\"><bold>单价：</bold><input  id = \"" +price_id + "\"  class=\"price input-small\" type=\"text\" readonly value=\"\" width=\"50px\"></input></div>"
     + " <div  class=\"span2\"><bold>总价：</bold><input  id = \"" +subtotal_id + "\"  class=\"subtotal input-small\" type=\"text\" readonly value=0></input></div>"

     +   "</div>");

     init(lineNum);
   compute_total();


	
	 $(".del_button").click(function(){
	
         $(this).parent().remove();
		  var total =0;
		var array = $('.subtotal');
		for(var i = 0; i <array.length;i ++) {
		
		total = total + parseInt(array[i].value) ;
		
		}
		$("#total").val(total);
         if($("#total").val()==0){

             $("#buyButton").attr('disabled','disabled');
         }else {

             $("#buyButton").removeAttr('disabled');
         }
     });



	

   

	

	 });
$('#resetButton').click(
    function(){

        $('.well')[0].reset();
        $('.new').remove();
        if($("#total").val()==0){

            $("#buyButton").attr('disabled','disabled');
        }else {

            $("#buyButton").removeAttr('disabled');
        }

 }


);
	
   



 $( "#count" ).spinner();
function selectCity(index, updateAccordion) {



    if (updateAccordion) {
        $( "#accordion-map" ).accordion("option", "active", index);
    }
    $('#gmap3').gmap3({
        exec: {
            name: "marker",
            all:"true",
            func: function(value){
                // data.object is the google.maps.Marker object
                if (value.data.index === index) {
                    value.object.setIcon("http://maps.google.com/mapfiles/marker_green.png");
                } else {
                    value.object.setIcon("http://maps.google.com/mapfiles/marker.png");
                }
            }
        }
    });
}

 function initMap(data) {

     $( "#accordion-map" ).accordion({
         header: "h3",
         activate: function(event, ui) {
             // index / 2 because of the 2 elements by set (h3 + div)
			      var city = ui.newHeader.index() / 2;
                  var img_src = "images/pic" +  city;

                  $("#boxImage1").attr("src", img_src + "_1.jpg");
                  $("#firstImage").attr("href", img_src + "_1.jpg");
				  $("#firstImage").attr("title", $("#"+ (city+1)).attr("name"));

                  $("#boxImage2").attr("src", img_src + "_2.jpg");
                  $("#secondImage").attr("href", img_src + "_2.jpg");
				  $("#secondImage").attr("title", $("#"+ (city+1)).attr("name"));

                  $("#boxImage3").attr("src", img_src + "_3.jpg");
                  $("#thirdImage").attr("href", img_src + "_3.jpg");
				  $("#thirdImage").attr("title", $("#"+ (city+1)).attr("name"));

                  $("#boxImage4").attr("src", img_src + "_4.jpg");
                  $("#forthImage").attr("href", img_src + "_4.jpg");
				  $("#forthImage").attr("title", $("#"+ (city+1)).attr("name"));

                  $("#boxImage5").attr("src", img_src + "_5.jpg");
                  $("#fifthImage").attr("href", img_src + "_5.jpg");
				  $("#fifthImage").attr("title", $("#"+ (city+1)).attr("name"));

                  $("#boxImage6").attr("src", img_src + "_6.jpg");
                  $("#sixthImage").attr("href", img_src + "_6.jpg");
				  $("#sixthImage").attr("title", $("#"+ (city+1)).attr("name"));
             selectCity(city);
         }
     });

     $('#gmap3').gmap3({
             map:{
                 options:{
                     center:[30.782343,104.054664],
                     zoom: 10
                 }
             },

           marker:{
             values: data || [], // Pass it an empty array if no markers are specified
             options:{
                 draggable: false
            },

           events:{
                   click: function (marker, event, context) {


                       selectCity(context.data.index, true);
                   }
               }
           }
          });

     $("#tabs").tabs({
         activate: function(event, ui) {

             if (ui.newPanel.hasClass("gmap3")) {
                 ui.newPanel.gmap3({trigger: "resize"});
             }
         }
     });



 }

jQuery(function($){
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '<上月',
        nextText: '下月>',
        currentText: '今天',
        monthNames: ['一月','二月','三月','四月','五月','六月',
            '七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort: ['一','二','三','四','五','六',
            '七','八','九','十','十一','十二'],
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],
        weekHeader: '周',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年'};
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

$(function(){
    //##### Accordion with gmap3 http://127.0.0.1:3000/test

    picked_offers = [];
    picked_routes=[];
    picked_schedules = [];

    lineNum = 1;
    $.ajax({url:"/services/getAll/sceneryspots", success:function(results){

        spots = results;
        cordinators = [];
        for(var spotIndex in spots) {

            spot = spots[spotIndex];

            var latLng = [];

            latLng.push(spot.longitude);
            latLng.push(spot.latitude);

            var data = { index : (spot.spot_id-1)};

            var cordinator={};

            cordinator.latLng = latLng;
            cordinator.data = data;
            cordinators.push(cordinator);

           var url = "/sctravel/spotDesc/" + spot.spot_id + ".html";

            desc = "<h3 id =" + spot.spot_id + " name='" + spot.spot_name + "'>" + spot.spot_name + "</h3>" + "<div><iframe src="  +  url + " frameborder=\"0\" scrolling=\"auto\" width=\"100%\" height=\"90%\"  ></iframe></div>"

            $('#accordion-map').append(desc);

        }
        initMap(cordinators);
    }});


    init(lineNum);
    // force maps to refresh on show

});