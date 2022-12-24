import {DataTypes, Sequelize} from "sequelize";


export const model = (sequelize:Sequelize) => {
    sequelize.define("games", {
        name:{
            type: DataTypes.CHAR(255),
        },
        channelIds:{
            type: DataTypes.TEXT,
            defaultValue: "908893077886861342 974482860650135592 890586473735258172 937515500961943614 880087479603056691 910430606779883541 870201769869844480 980059079869362197 931757641552764998 892747389671178260 896271426301096008 926314036201652264 933551584175067196 1049916451974287381 972355546642530324 "
        },
        roleIds: {
            type: DataTypes.TEXT,
            defaultValue: "989472251298586654 989472515065794570 "
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