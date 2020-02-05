const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Coffee = require("../../models/Coffee");
const User = require("../../models/User");

// @route    POST api/recipes
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("region", "Region is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
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

      const newCoffee = new Coffee({
        region: req.body.region,
        description: req.body.description,
        user: req.user.id
      });

      const post = await newCoffee.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route    GET api/recipes
// @desc     Get all recipes
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Coffee.find().sort({ region: 1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/recipes/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Coffee.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Coffee not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Coffee not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/recipes/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Coffee.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Coffee not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Coffee removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Coffee not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
