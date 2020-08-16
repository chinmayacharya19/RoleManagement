import mongoose from "mongoose";
import { WorkspaceTaskOperation, WorkspaceTaskType, WorkspaceTaskState } from "./Enums";

export interface IWorkspaceTask extends mongoose.Document {
    id: String;
    taskTemplateId: String;
    title: String;
    type: WorkspaceTaskType;
    operation: WorkspaceTaskOperation;
    outputData: any;
    state: WorkspaceTaskState;
};

export const WorkspaceTaskSchema = new mongoose.Schema({
    id: { type: String },
    taskTemplateId: { type: String },
    title: { type: String },
    type: { type: String },
    operation: { type: String },
    outputData: { type: String },
    state : { type: String }
});
const WorkspaceTask = mongoose.model<IWorkspaceTask>("Device", WorkspaceTaskSchema);
export default WorkspaceTask;
