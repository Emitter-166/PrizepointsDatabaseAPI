type game = {
    id: number,
    name: string,
    channels: string[],
    roles: string[],
    pointsPerMessage: number,
    pointsPerThreadCreation: number,
    enabled: boolean
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
    channelIds?: string,
    roleIds?: string,
    pointsPerMessage?: number,
    pointsPerThreadCreation?: number,
    enabled?: boolean
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