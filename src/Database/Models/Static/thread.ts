import {DataTypes, Sequelize} from "sequelize";

export const model = (sequelize:Sequelize) => {
    sequelize.define("threads", {
        threadId:{
            type: DataTypes.CHAR(30),
            // unique: true
        },
        points:{
            type: DataTypes.INTEGER
        }
    }, {timestamps: false})
}