module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.STRING
        },
        time: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: "comments",
        timestamps: false
    });

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: "user_id" });
        Comment.belongsTo(models.Post, { foreignKey: "post_id" });

    };

    return Comment;
}