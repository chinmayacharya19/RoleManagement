import mongoose, { Schema } from "mongoose";
import { WorkspaceTaskOperation, WorkspaceTaskType, WorkspaceTaskState } from "./Enums";
import { IUser } from "../models/User";

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
    outputData: { type: Object },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    state: { type: String }
});
const WorkspaceTask = mongoose.model<IWorkspaceTask>("WorkspaceTask", WorkspaceTaskSchema);
export default WorkspaceTask;
