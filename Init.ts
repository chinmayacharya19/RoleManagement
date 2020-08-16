import mongoose from "mongoose";
import User from "./models/User";
import { Roles } from "./models/Enums";
import bcrypt from "bcrypt";

const uri: string = "mongodb://127.0.0.1:27017/dockyard";

async function mongoConnect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
            if (err) {
                resolve(err)
            } else {
                console.log("Successfully Connected!");
                resolve()
            }
        });
    })
}

async function createCaptainIfNotExists() {
    let captain = await User.findOne({ "role": Roles.CAPTAIN })
    let passwordBcrypt = await bcrypt.hash("admin", 11)
    if (!captain) {
        await User.insertMany([{
            id: "admin",
            crewId: "admin",
            password: passwordBcrypt,
            emailId: "admin@test.com",
            role: Roles.CAPTAIN,
            name: "Administrator",
            label: "Admin",
            photo: "AdminPhoto",
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    }
}

export class Context {
    async Init(): Promise<Context> {
        await mongoConnect();
        await createCaptainIfNotExists()
        return this
    }
}

let ctx = new Context();

export default ctx;