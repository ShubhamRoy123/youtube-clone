import {Connection} from "mangoose"

declare global{
    var mongoose: {
        conn:""
        promise: Promise<Connection> | null
    }
}

export {};