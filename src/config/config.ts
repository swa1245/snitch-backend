import dotenv from 'dotenv'
dotenv.config()

type Config = {
    readonly MONGO_URI: string;
    readonly PORT: number;
}

export const config: Config = {
    MONGO_URI: process.env.MONGO_URI as string,
    PORT: Number(process.env.PORT) 
}