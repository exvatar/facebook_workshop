const router = require("express").Router();
const passport = require("passport");
const { createComment, deleteComment, editComment } = require("../controllers/comment");


const auth = passport.authenticate("jwt", { session: false });

router.post("/", auth, createComment);
router.delete("/:id", auth, deleteComment);
router.put("/:id", auth, editComment);

module.exports = router;