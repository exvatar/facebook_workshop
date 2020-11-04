const db = require('../models');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, password, email, firstname, lastname, picture_url } = req.body;
    const dupUsername = await db.User.findOne({ where: { username } });

    if (dupUsername) {
        res.status(400).send({ message: "Duplicate username" })
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        await db.User.create({ username, password: hashedPassword, email, firstname, lastname, picture_url });
        res.status(200).send({ message: "Create Success" });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        if (bcryptjs.compareSync(password, targetUser.password)) {
            const token = jwt.sign(
                {
                    id: targetUser.id
                },
                "facebook",
                { expiresIn: 3600 }
            );
            res.status(200).send({ token });
        } else {
            res.status(400).send({ message: "Wrong password" })
        }
    } else {
        res.status(400).send("Not Found Username")
    }
}


module.exports = { login, register };
