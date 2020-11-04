const db = require('../models');

const createPost = async (req, res) => {
    const { caption, picture_url, createdAt, updatedAt } = req.body;
    const user = await db.User.findOne({ where: { id: req.user.id } });
    if (user) {
        const newPost = await db.Post.create({
            caption,
            picture_url,
            createdAt,
            updatedAt,
            user_id: user.id
        })
        res.status(200).send({ message: "Create Success", data: newPost })
    } else {
        res.status(400).send("Not found user ID");
    }
};

const deletePost = async (req, res) => {
    const targetId = req.params.id;
    const targetPost = await db.Post.findOne({ where: { id: targetId } });

    if (targetPost && targetPost.user_id === req.user.id) { //เช็คว่าเป็นเจ้าของโพสจริงไหม
        targetPost.destroy();
        res.status(200).send({ message: `Post ID: ${targetId} has been deleted` });
    } else {
        res.status(404).send({ message: `Post ID: ${targetId}` });
    }
};

const editPost = async (req, res) => {
    const targetPost = await db.Post.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    const { caption, picture_url } = req.body;
    if (targetPost) {
        await targetPost.update({ caption, picture_url })
        res.status(200).send({ message: "Update success" })
    } else {
        res.status(400).send("Not found your post")
    }
};

const getAllMyPost = async (req, res) => {
    const allMyPost = await db.Post.findAll({ where: { user_id: req.user.id } })
    res.status(200).send(allMyPost)
};

const getMyFeed = async (req, res) => {
    const myFeeds = await db.Post.findAll()
    res.status(200).send(myFeeds)
};

module.exports = {
    createPost,
    deletePost,
    editPost,
    getAllMyPost,
    getMyFeed,
};