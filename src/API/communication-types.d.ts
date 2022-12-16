type game = {
    id: number,
    name: string,
    channels: {
        channelName: string,
        channelId: string
    }[],
    roles: {
        roleName: string,
        roleId: string
    }[],
    pointsPerMessage: number,
    pointsPerThreadCreation: number
}

type points = {
    gamName: string,
    id: number,
    points: {
        userId: string,
        points: number
    }[]
}

type thread = {
    threadId: string,
    points: number
}

type gameUpdateField = {
    name: string,
    channels?: {
        channelName: string,
        channelId: string
    }[],
    roles?: {
        roleName: string,
        roleId: string
    }[],
    pointsPerMessage?: number,
    pointsPerThreadCreation?: number
}

type threadUpdateField = {
    threadId: string,
    points: number
}

type pointsUpdateField = {
    gameName: string,
    userId: string
    point: number
    threadId: string
}


type threadGetField = {
    name: string
}

type gameGetField = {
    name: string
}

type pointsGetField = {
    name: string
}