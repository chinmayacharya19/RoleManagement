import mongoose from "mongoose";
import { TaskCommandState } from "./Enums";
import { IUser } from "./User";
import { IWorkspaceTask } from "./WorkspaceTask";

export interface ITaskCommand extends mongoose.Document {
    id: String;
    state: TaskCommandState;
    createdAt: Date;
    updatedAt: Date;
    from: IUser;
    to: IUser;
    type: String;
    task: IWorkspaceTask;
}

const TaskCommandSchema = new mongoose.Schema({
    id: { type: String },
    state: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    from: { type: String },
    to: { type: String },
    type: { type: String },
    task: { type: String }
});

const TaskCommand = mongoose.model<ITaskCommand>("TaskCommand", TaskCommandSchema);
export default TaskCommand;
