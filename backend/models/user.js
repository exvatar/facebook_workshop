module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        firstname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        picture_url:{
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        tableName: "users",
        timestamps: false
    });

    User.associate = models => {
        User.hasMany(models.Post, { foreignKey: "user_id" });
        User.hasMany(models.Comment, { foreignKey: "user_id" });
        User.belongsToMany(models.User,{
            through: models.Friend,
            as: 'requesterTo',
            foreignKey:'request_to_id'
        });
        User.belongsToMany(models.User,{
            through: models.Friend,
            as: 'requesterBy',
            foreignKey:'request_by_id'

        })

    };

    return User;
}