import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import md5 from "md5";

const {PASSWORD_SECRET} = process.env

class Users extends Model {
    static passHash = (password) => {
        return md5(md5(password) + PASSWORD_SECRET)
    }
}

Users.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.CHAR(100),
        allowNull: false,
        get() {
            return undefined
        },
        set(val) {
            if (val) {
                this.setDataValue('password', Users.passHash(val))
            }
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'pending'),
        allowNull: false,
        defaultValue: 'pending',
    },
    role: {
        type: DataTypes.ENUM('tourist', 'guide', 'company', 'admin'),
        allowNull: false,
        defaultValue: 'tourist',
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activationCode: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return undefined
        }
    },

}, {
    sequelize,
    tableName: "users",
    modelName: "users",
    indexes: [{
        fields: ['email'],
        unique: true
    }]
})


export default Users