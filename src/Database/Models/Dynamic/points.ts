import {DataTypes, Sequelize} from "sequelize";

export const model = (sequelize:Sequelize, modelName:string) => {
    sequelize.define(modelName, {
      userId:{
          type: DataTypes.CHAR(30),
          unique: true
      },
        points: {
          type: DataTypes.INTEGER
        }
    }, {timestamps: false})
}