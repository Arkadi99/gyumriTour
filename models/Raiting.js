import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Service from "./Service";
import Users from "./Users";


class Raiting extends Model {}

Raiting.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    rate: {
        type : DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'raiting',
    modelName: 'raiting'
})

Raiting.belongsTo(Service, {
    foreignKey: 'serviceId',
    onDelete: 'cascade',
});
Service.hasOne(Raiting, {
    foreignKey: 'serviceId',
    onDelete: 'cascade',
});

Raiting.belongsTo(Users, {
    foreignKey: 'userId',
});
Users.hasMany(Raiting, {
    foreignKey: 'userId',
});

export default Raiting;