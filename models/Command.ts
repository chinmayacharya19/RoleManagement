import mongoose, { Schema } from "mongoose";
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
    from: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    type: { type: String },
    task: [{ type: Schema.Types.ObjectId, ref: 'WorkspaceTask' }]
});

const TaskCommand = mongoose.model<ITaskCommand>("TaskCommand", TaskCommandSchema);
export default TaskCommand;
