var mongoose = require('mongoose');
//var blogModel = mongoose.model('Region');

const Region = require("../models/Region");

const sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

/* GET a list of all regions*/
module.exports.regList = function(req, res) {
    console.log('Getting regions list');
    Region
        .find()
        .exec(function(err, results) {
  	    if (!results) {
          sendJSONresponse(res, 404, {
  		    "message": "no regions found"
  		    });
          return;

  	    } else if (err) {
        		console.log(err);
        		sendJSONresponse(res, 404, err);
        		return;
  	    }
  	    console.log(results);
  	    sendJSONresponse(res, 200, buildRegList(req, res, results));
  	});
};

/* builds a list of malware events */
var buildRegList = function(req, res, results){
    var countries = [];
    results.forEach(function(obj) {
    	countries.push({
           _id: obj._id,
           name: obj.name,
           lat: obj.lat,
           lng: obj.lng,
           description: obj.description,
           img: obj.img,
           sound: obj.sound
    	});
    });
    return countries;
};

/* Update one Region entry */
module.exports.updateOne = function(req, res) {
    console.log("Updating a region entry with id of " + req.params.id);
    console.log(req.body);
    console.log(req.params);
    Region
	.findOneAndUpdate(
	    { _id: req.params.id },
	    { $set: {"name": req.body.name, "lat": req.body.lat, "lng": req.body.lng, "img": req.body.img, "description": req.body.description}}
	)
	.exec(
	    function(err, response) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 201, response);
            }
	    }
	);
};

