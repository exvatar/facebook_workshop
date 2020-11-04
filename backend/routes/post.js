const { createPost, deletePost, editPost, getAllMyPost, getMyFeed } = require("../controllers/post");
const router = require("express").Router();
const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, getAllMyPost);
router.get("/feed", auth, getMyFeed);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, editPost);

module.exports = router;