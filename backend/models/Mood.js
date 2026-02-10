const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mood = sequelize.define('Mood', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    mood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Mood;
