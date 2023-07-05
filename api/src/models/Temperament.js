const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperement', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
    }, {timestamps: false})
};