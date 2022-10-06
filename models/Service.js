import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Users from "./Users";


class Service extends Model {}

Service.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT('long'),
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('caffe', 'guide', 'view', 'hotel'),
        allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "services",
    modelName: "services",
    // indexes: []
})

Service.belongsTo(Users, {
    foreignKey: 'userId'
});
Users.hasMany(Service, {
    foreignKey: 'userId'
});

export default Service;