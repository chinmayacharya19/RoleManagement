import mongoose from "mongoose";
import { Roles, Devices, OS } from "./Enums";

export interface IUser extends mongoose.Document {
    id: string;
    password: string;
    crewId: string;
    emailId: string;
    role: Roles;
    name: string;
    label: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
    device: Devices;
    os: OS;
    isOnline: Boolean;
    ipAddress: string;
    macAddress?: string;
    lastOnlineAt?: string;
    lastLoginToken: string;
};
export const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    crewId: { type: String, },
    emailId: { type: String, },
    role: { type: String, },
    name: { type: String, },
    label: { type: String, },
    photo: { type: String, },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
    device: { type: String },
    os: { type: String },
    isOnline: { type: String },
    ipAddress: { type: String },
    macAddress: { type: String },
    lastOnlineAt: { type: String },
    lastLoginToken: { type: String }
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;