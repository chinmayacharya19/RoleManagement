import mongoose from "mongoose";
import { WorkspaceTaskOperation, WorkspaceTaskType, WorkspaceTaskState } from "./Enums";
import { IUser } from "../models/User";
import User from "./User";

export interface IWorkspaceTask extends mongoose.Document {
    id: String;
    taskTemplateId: String;
    title: String;
    type: WorkspaceTaskType;
    operation: WorkspaceTaskOperation;
    outputData: any;
    user: IUser,
    state: WorkspaceTaskState;
};

export const WorkspaceTaskSchema = new mongoose.Schema({
    id: { type: String },
    taskTemplateId: { type: String },
    title: { type: String },
    type: { type: String },
    operation: { type: String },
    outputData: { type: String },
    user: { type: User },
    state : { type: String }
});
const WorkspaceTask = mongoose.model<IWorkspaceTask>("WorkspaceTask", WorkspaceTaskSchema);
export default WorkspaceTask;
