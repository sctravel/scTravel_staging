/**
 * Created by XiTU on 4/13/14.
 */

var searchResults={};
function gridFormatter(srs){
   var results = {rows: [ ] };
    for(var i =0; i < srs.length;i ++ ){

        var result = srs[i];

        var cell = [];
        for(var attr in result) {
           if(attr==)
            cell.put(result[attr]);

        }

        results.rows.put({"cell" : cell});
    }
   return results;

}

$('#searchOrder1').click(function(){


    console.log("Search orders by customer name and mobile phone");
    var customerInfo={};
    customerInfo.customerName = $('#name').val();
    customerInfo.mobilePhone = $('#phone').val();

    $.get('/services/search/orders', {"customerInfo" : customerInfo},  function(data){
        //console.log("redirect to alipay finished");
        searchResults=data;



  
        console.dir(data);
        //jQuery(document).ready(function(){
            jQuery("#orderSearchResult").jqGrid({
                datastr: results,
                datatype: "jsonstring",
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
        //});
    });


});

$('#searchOrder2').click(function(){

    console.log("Search orders by confirmCOde");
    var confirmCode = $('#confirmCode').val();

    $.get('/services/search/orders', {"confirmCode" : confirmCode},  function(data){
        searchResults=data;

      var results =   gridFormatter(searchResults);

        console.dir(data);
        //jQuery(document).ready(function(){
            jQuery("#orderSearchResult").jqGrid({
                data: results,
                datatype: "json",
                colNames:['出发地','景点','票种','日期','时间','人数','价格','总价'],
                colModel:[
                    {name:'start',index:'start',align:'right'},
                    {name:'end',index:'end', align:"right"},
                    {name:'type', index:'type', align:"right" },
                    {name:'date',index:'date', align:"right"},
                    {name:'time',index:'time', align:"right"},
                    {name:'amount',index:'amount', align:"right"},
                    {price:'price',index:'price', align:"right"},
                    {name:'subtotal',index:'subtotal', align:"right"}

                ],
                id:data.voucher_id
            });
        //});
    });


});
