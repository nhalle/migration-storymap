const mongoose = require('mongoose');
//var blogModel = mongoose.model('Region');
const Story = require("../models/Story");

const sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

/* Create Marker*/
module.exports.createOne = function(req, res) {
    console.log('Finding story', req.params);
    Story
      .findById(req.params.storyid)
      .exec(
        function(err, story){
          if(err){
            sendJSONresponse(res,400, err);
          }
          else{
            doAddMarker(req,res,story);
          }
        }
  
      );
  
  };
  
  const doAddMarker = function(req, res, story){
    console.log("doAddMarker");
    if (!story) {
      sendJSONresponse(res, 404, "storyid not found");
    } else {
      story.markers.push({
          name: req.body.name,
          description: req.body.description,
          lat: req.body.lat,
          lng: req.body.lng,
          img: req.body.img,
          sound: req.body.sound
      });
      story.save(function(err, story) {
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          thisMarker = story.markers[story.markers.length - 1];
          sendJSONresponse(res, 201, thisMarker);
        }
      });
    }
  };



  /* GET a list of all regions*/
module.exports.markerList = function(req, res) {
    console.log("Getting a list of all markers for the story")
    Story
        .findById({ _id: req.params.storyid })
        .exec(function(err, story) {
        if (!story) {
            sendJSONresponse(res, 404, {
            "message": "story not found"
            });
            return;

        } else if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
        } else if (story.markers.length === 0){
            sendJSONresponse(res,200, []);
            return;
        }
        sendJSONresponse(res, 200, buildMarkerList(req, res, story));
    })
};

/* builds a list of stories in a region */
const buildMarkerList = function(req, res, story){
    console.log("building list")
    const markers = [];
    story.markers.forEach(function(obj) {
    	markers.push({
           _id: obj._id,
           name: obj.name,
           lat: obj.lat,
           lng: obj.lng,
           description: obj.description,
           img: obj.img,
           sound: obj.sound,
    	});
    });
    return markers;
};


module.exports.deleteOne = function(req, res) {
    Story
        .findByIdAndUpdate(req.params.storyid,{
            '$pull': {
            markers:{ '_id': req.params.markerid}
        }})
        .exec(function(err,response){
            if(!response){
                sendJSONresponse(res,404, {
                    "message": "story not found"
                });
            }
            else if(err){
                sendJSONresponse(res, 400, err);
            }
            else{
                sendJSONresponse(res, 200, response);
            }
        })
        
    
};


