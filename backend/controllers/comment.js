const db = require('../models');

const createComment = async (req, res) => {
    const { comment, time, post_id } = req.body
    const user_id = req.user.id

    await db.Comment.create({ comment, time, post_id, user_id })
    res.status(200).send("Success")
}

const deleteComment = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    const targetComment = await db.Comment.findOne({ where: { id } })
    if (targetComment) {
        await targetComment.destroy();
        res.status(200).send("Success");
    } else {
        res.status(400).send("Not found comment");
    }
}

const editComment = async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;
    const targetComment = await db.Comment.findOne({ where: { id } })
    if (targetComment) {
        await targetComment.update({ comment });
        res.status(200).send("Success");
    } else {
        res.status(400).send("Not found comment");
    }
}

module.exports = {
    createComment,
    deleteComment,
    editComment
};