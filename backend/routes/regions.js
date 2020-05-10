const express = require("express");
const router = express.Router();

const ctrlRegions = require("../controllers/regions");
const Region = require("../models/Region");

router.get("/all", ctrlRegions.regList);

router.get('/:id',(req,res) => {
  const id = req.params.id;

  Region.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Region with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Region with id=" + id });
    });
});

router.get('/',(req,res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Region.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving regions."
      });
    });
});



// @route POST api/tasks/create
// @desc Create a new task
// @access Private
router.post("/create", (req, res) => {
    const NEW_REGION= new Region({
      name: req.body.name,
      description: req.body.description,
      lat: req.body.lat,
      lng: req.body.lng,
      img: req.body.img
    });

    NEW_REGION.save()
      .then(region => res.json(region))
      .catch(err => console.log(err));
  }
);

// @route PUT api/tasks/delete
// @desc Delete an existing task
// @access Private
router.put("/:id", ctrlRegions.updateOne)

// @route DELETE api/tasks/delete
// @desc Delete an existing task
// @access Private
router.delete(
  "/delete/:id",
  (req, res) => {
    Region.findById(req.params.id).then(region => {
      region.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;