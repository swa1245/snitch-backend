import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY as string,
})


export async function uploadImage(file: Buffer, fileName: string) {
    const result = await client.upload({
        file:await ImageKit.toFile(Buffer.from(file)),
        fileName: fileName
    })
    return result.url
}