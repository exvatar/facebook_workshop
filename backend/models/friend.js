module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        status: {
            type: DataTypes.ENUM("FRIEND","PENDING","BLOCK")
        },
    }, {
        tableName: "friends",
        timestamps: false
    });

    // User.associate = models => {
    //     User.hasMany(models.Todo, { foreignKey: "user_id" });
    // };

    return Friend;
}