var mongoose = require('mongoose');
//var blogModel = mongoose.model('Region');
const Region = require("../models/Region");
const Story = require("../models/Story");

const sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};


/* Create story*/
module.exports.createOne = function(req, res) {
    console.log("new story");
    const NEW_STORY= new Story({
        regionid: req.params.regionid,
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        markers: []
    });

    NEW_STORY.save()
            .then(story => res.json(story))
            .catch(err => console.log(err)); 
};  


/* GET a list of all regions*/
module.exports.regionStoryList = function(req, res) {
  console.log("Getting a list of all stories for region")
    Story
        .find({ regionid: req.params.regionid })
        .exec(function(err, results) {
        if (!results) {
            sendJSONresponse(res, 404, {
                "message": "no stories found"
            });
            return;

        } else if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildStoryList(req, res, results));
    })
};

/* builds a list of stories in a region */
const buildStoryList = function(req, res, results){
    const stories = [];
    results.forEach(function(obj) {
      console.log(obj)
    	stories.push({
           _id: obj._id,
           regionid: obj.regionid,
           name: obj.name,
           description: obj.description,
           img: obj.img,
           sound: obj.sound
    	});
    });
    return stories;
};