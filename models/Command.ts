import mongoose, { Schema } from "mongoose";
import { TaskCommandState } from "./Enums";
import { IUser } from "./User";
import { IWorkspaceTask } from "./WorkspaceTask";

interface ITask {
    taskTemplateId: string;
    title: string;
    type: string;
}
export interface ITaskCommand extends mongoose.Document {
    id: string;
    state: TaskCommandState;
    createdAt: Date;
    updatedAt: Date;
    from: IUser;
    to: IUser;
    type: string;
    task: ITask;
}

const TaskSchema = new mongoose.Schema({
    taskTemplateId: { type: String },
    title: { type: String },
    type: { type: String }
});

const TaskCommandSchema = new mongoose.Schema({
    id: { type: String },
    state: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    task: TaskSchema
});

const TaskCommand = mongoose.model<ITaskCommand>("TaskCommand", TaskCommandSchema);
export default TaskCommand;
