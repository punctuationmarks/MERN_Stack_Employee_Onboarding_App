const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const ProTip = require("../../models/ProTip");
const User = require("../../models/User");

// @route    POST api/proTips
// @desc     Create a proTip
// @access   Private
router.post(
  "/",
  [
    auth,
    [

      check("title", "Title is required")
      .not()
      .isEmpty(),
      check("text", "Text is required")
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

      const newProTip = new ProTip({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const proTip = await newProTip.save();

      res.json(proTip);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/proTips
// @desc     Get all proTips
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const proTips = await ProTip.find().sort({ date: -1 });
    res.json(proTips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/proTips/:id
// @desc     Get proTip by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const proTip = await ProTip.findById(req.params.id);

    if (!proTip) {
      return res.status(404).json({ msg: "ProTip not found" });
    }

    res.json(proTip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "ProTip not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/proTips/:id
// @desc     Delete a proTip
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const proTip = await ProTip.findById(req.params.id);

    if (!proTip) {
      return res.status(404).json({ msg: "ProTip not found" });
    }

    // Check user
    if (proTip.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await proTip.remove();

    res.json({ msg: "ProTip removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "ProTip not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/proTips/like/:id
// @desc     Like a proTip
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const proTip = await ProTip.findById(req.params.id);

    // Check if the proTip has already been liked
    if (
      proTip.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "ProTip already liked" });
    }

    proTip.likes.unshift({ user: req.user.id });

    await proTip.save();

    res.json(proTip.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/proTips/unlike/:id
// @desc     Like a proTip
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const proTip = await ProTip.findById(req.params.id);

    // Check if the proTip has already been liked
    if (
      proTip.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "ProTip has not yet been liked" });
    }

    // Get remove index
    const removeIndex = proTip.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    proTip.likes.splice(removeIndex, 1);

    await proTip.save();

    res.json(proTip.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/proTips/comment/:id
// @desc     Comment on a proTip
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
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
      const proTip = await ProTip.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      proTip.comments.unshift(newComment);

      await proTip.save();

      res.json(proTip.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/proTips/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const proTip = await ProTip.findById(req.params.id);

    // Pull out comment
    const comment = proTip.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = proTip.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    proTip.comments.splice(removeIndex, 1);

    await proTip.save();

    res.json(proTip.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
