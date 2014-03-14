	/*
	 * GET home page.
	 */
	var queryDB = require('../node_modules/queryDB');
	
	
	var confirmCode="BV46YFA1UD2WDTZ";
	
	var order;
	queryDB.checkOrder(confirmCode,function(results){
	    order=results;
	    console.log(order);
	})
	var spots;
	queryDB.getAllScenerySpots(function(results){
	    spots = results;
	    console.log(results);
	} )
	
	
	
	var test = [
	    {latLng:[30.652343,104.054664], data: {index: 0},
	        options:{icon: "http://maps.google.com/mapfiles/marker_green.png"}
	    },
	    {latLng:[30.672343,104.054664], data: {index: 1}},
	    {latLng:[30.632343,104.044664], data: {index: 2}}
	];
	
	
	exports.test = function(req, res){
	   // res.send(order);
	    console.log(1112);
	   res.json(test);
	 //   res.send("test");
	};
