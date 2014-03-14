 $("#buyButton").click(function() {

    var spot = $('option:selected','.spotSelect');
    var from = $('option:selected','.fromSelect');
    var date = $('.datepicker');
    var amount= $('.amount');
    var price = $('.price');
    var subtotal= $('.subtotal');
    var total = $('.total');
    var time = $('.time');



    var orders = [];
    for(var i = 0; i < spot.length;i ++){
        var order = { "cell" : [from[i].text, spot[i].text, date[i].value, time[i].value, amount[i].value, price[i].value, subtotal[i].value ],"spot_id" : spot[i].value, "from_id":from[i].value };
          orders.push(order);

    }

     var order = {"cell": [' ',' ',' ',' ',' ','合计',total.val()]};
     orders.push(order);
   var orderlist= {"rows" : orders};
       orderlist.total_amount=total.val();
    //var total = { "total" : total[0].value}
    //orders.push(total);

     $.post('/orders', {"orderlist" : orderlist},  function(data){

         window.location.href="/sctravel/orderReview.html";
     });



 });
 
 $("#addButton").click(function(){
     
  $("#buyTicket").append("<div class=\"row-fluid order new\" ><div  class=\"span2\"><bold>出发地：</bold><select id=\"fromselect\" class=\"fromSelect\" style=\"width:140px;\"><option value=\"1\">香格里拉大酒店</option><option value=\"2\">望江宾馆</option><option value=\"3\">凯丽假日酒店</option></select></div><div class=\"span2\"><bold>景点：</bold><select class=\"spotSelect input-small\"><option value=\"1\">武侯祠</option><option value=\"2\">杜甫草堂</option><option value=\"3\">青羊宫</option></select></div><div class=\"span2\"><label for=\"datepicker\">日期：<input type=\"text\" class=\"datepicker input-small\" ></label></div><div  class=\"span2\"><bold>时间：</bold><select class=\"time input-small\"><option value=\"9:00\">9:00</option><option value=\"9:30\">9:30</option><option value=\"10:00\">10:00</option><option value=\"10:30\">10:30</option><option value=\"11:00\">11:00</option><option value=\"11:30\">11:30</option><option value=\"12:00\">12:00</option><option value=\"12:30\">12:30</option><option value=\"13:00\">13:00</option><option value=\"13:30\">13:30</option><option value=\"14:00\">14:00</option><option value=\"14:30\">14:30</option><option value=\"15:00\">15:00</option></select></div><div  class=\"span2\"><bold>人数：</bold><input  type=\"text\" class=\"amount input-small\" value=\"1\"></input></div><div  class=\"span2\"><bold>单价：</bold><input  id = \"price\"  class=\"price input-small\" type=\"text\" readonly value=999></input></div><div class=\"span2\"><bold>总价：</bold><input  class=\"subtotal input-small\" width=\"60px\" type=\"text\" readonly value=\"999\"></input></div><div>&nbsp;</div><button class=\"del_button\">删除</button></div></div>");
     //$("#buyTicket").append("<p>test</p>");

     $('.datepicker').datepicker({
         dateFormat: 'yy-mm-dd'
     });
	
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
   $( ".spotSelect" ).change(function() {
       
	   var new_Price = 999;
	   var new_subtotal=999;
	  if($(this).val()=="1"){
	            $(this).parent().next().next().next().next().children().first().next().val(999);

      
	  }else if($(this).val()=="2"){
	            
				$(this).parent().next().next().next().next().children().first().next().val(900);
			     new_Price = 900;
	  
	  }else if($(this).val()=="3"){
	            $(this).parent().next().next().next().next().children().first().next().val(998);
                new_Price = 998;
      }
      
	  var num = $(this).parent().next().next().next().children().next().val();

	  new_subtotal = new_Price * num;
	 
	 $(this).parent().next().next().next().next().next().children().val(new_subtotal);
    
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
	
	 $( ".amount" ).change(function() {
	  
	    var num = $(this).val();
	    var price = $(this).parent().next().children().first().next().val();
	    var subtotal = price * num;
		$(this).parent().next().next().children().first().next().val(subtotal);
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
   
  $( ".spotSelect" ).change(function() {
     
       var new_Price = 999;
	   var new_subtotal=999;
	  if($(this).val()=="1"){
	             
	           
	             $(this).parent().next().next().next().next().children().first().next().val('999');

      
	  }else if($(this).val()=="2"){

				$(this).parent().next().next().next().next().children().first().next().val('900');
			     new_Price = 900;
	  
	  }else if($(this).val()=="3"){
	            $(this).parent().next().next().next().next().children().first().next().val('998');
          new_Price = 998;
      }

	  var num = $(this).parent().next().next().next().children().next().val();
	 
	  new_subtotal = new_Price * num;
	 
	 $(this).parent().next().next().next().next().next().children().val(new_subtotal);
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
	
	 $( ".amount" ).change(function() {
	  
	    var num = $(this).val();
	    var price = $(this).parent().next().children().first().next().val();
	    var subtotal = price * num;
		$(this).parent().next().next().children().first().next().val(subtotal);
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
	
   
   $('.datepicker').datepicker({
          dateFormat: 'yy-mm-dd'
    });
	
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
             selectCity(ui.newHeader.index() / 2);
         }
     });

     $('#gmap3').gmap3({
             map:{
                 options:{
                     center:[30.652343,104.054664],
                     zoom: 12
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

$(function(){
    //##### Accordion with gmap3 http://127.0.0.1:3000/test

    $.ajax({url:"/test", success:function(results){

        initMap(results);

    }});
    // force maps to refresh on show

});