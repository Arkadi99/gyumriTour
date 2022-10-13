import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Service from "./Service";
import Users from "./Users";


class Comment extends Model {}


Comment.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'comments',
    modelName: 'comments'
})

Comment.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'cascade'
});
Users.hasMany(Comment, {
    foreignKey: 'userId',
});

Comment.belongsTo(Service, {
    onDelete: 'cascade',
    foreignKey: 'serviceId'
});
Service.hasMany(Comment, {
    foreignKey: 'serviceId'
});

export default Comment;