import {DataTypes, Sequelize} from "sequelize";


export const model = (sequelize:Sequelize) => {
    sequelize.define("games", {
        name:{
            type: DataTypes.CHAR(255),
        },
        channelIds:{
            type: DataTypes.TEXT,
            defaultValue: "1066663398043029504 1065819975530598481 1065820552146731068"
        },
        roleIds: {
            type: DataTypes.TEXT,
            defaultValue: "1041351113594646648"
        },
        pointsPerMessage:{
            type: DataTypes.INTEGER,
            defaultValue: 5
        },
        pointsPerThreadCreation:{
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {timestamps: false})
}