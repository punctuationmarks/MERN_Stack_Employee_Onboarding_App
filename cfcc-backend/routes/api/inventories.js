const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Inventory = require("../../models/Inventory");
const User = require("../../models/User");

// uppercase function
const capitalizeString = str =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

// @route    POST api/inventory
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newInventory = new Inventory({
        title: req.body.title,
        supplier: req.body.supplier,
        user: req.user.id
      });

      const post = await newInventory.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/inventory
// @desc     Get all inventory
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ title: 1 });
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/inventory/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Inventory.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Inventory not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/inventory/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Inventory.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Inventory not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Inventory removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
