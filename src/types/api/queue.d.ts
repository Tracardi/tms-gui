export interface IQueueStats {
    backlogSize: number,
    msgRateIn: number,
    msgThroughputIn: number,
    msgRateOut: number,
    msgThroughputOut: number,
    subscriptions: {
        [key: string]: ISubscription
    }
}

export interface ISubscription {
    msgBacklog: number,
    backlogSize: number,
    msgDelayed: number
    unackedMessages: number
    type: string
    consumers: unknown[]
    isDurable: boolean
    isReplicated: boolean
}
