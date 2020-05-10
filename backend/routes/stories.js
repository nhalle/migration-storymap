const express = require("express");
const router = express.Router();

const ctrlStories = require("../controllers/stories");
const ctrlMarkers = require("../controllers/markers")
const Story = require("../models/Story");

//stories by region id 
// /api/stories/:regionid WORKS
router.post("/:regionid", ctrlStories.createOne);

router.get("/region-list/:regionid", ctrlStories.regionStoryList);
//router.put("/:id", ctrlRegions.updateOne)
router.delete(
  "/:storyid",
  (req, res) => {
    Story.findById(req.params.storyid).then(story => {
      story.remove().then(() => res.json({ success: true }));
    });
  }
);

// markers by story id 
router.get('/list-markers/:storyid',ctrlMarkers.markerList);

router.post("/create-marker/:storyid", ctrlMarkers.createOne);

router.delete(
  "/:storyid/marker/:markerid",ctrlMarkers.deleteOne);

module.exports = router;