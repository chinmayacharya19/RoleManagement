/**
 * User related schema
 */
export type IUser = {
	id: string;
	crewId: string;
	emailId: string;
	role:
		| "CAPTAIN"
		| "ENGINEER"
		| "OFFICER"
		| "CHIEF_ENGINEER"
		| "CHIEF_OFFICER"
		| "CREW"
		| "UNASSIGNED";
	name: string;
	label: string;
	photo: string;
	createdAt: string;
	updatedAt: string;
};

export type IDevice = {
	device: "TABLET" | "DESKTOP" | "MOBILE";
	os: "WINDOWS" | "LINUX" | "ANDROID" | "IOS";
	isOnline: boolean;
	ipAddress: string;
	macAddress?: string;
	lasOnlineAt?: string;
};

export type ITask = {
	id: string;
	title: string;
	inputData: any;	
}

/**
 * Task Related Schema
 */
export type IWorkspaceTask = {
	id: string; //aka workspaceTaskId
	taskTemplateId: string;
	title: string;
	type: "CHECKLIST" | "LOG";
	operation: "RECORD" | "APPROVAL";
	outputData: any;
	state: "IDLE" | "IN-PROGRESS" | "COMPLETE" | "CANCELLED";
};

/** COMMAND related schema */
export type ITaskCommandState = "WAITING" | "PROCESSED" | "CANCELLED";
export type ITaskCommand = {
	id: string;
	state: ITaskCommandState;
	createdAt: string;
	updatedAt: string;
	from: IUser;
	to: IUser;
} & (
	| {
			type: "TASK_CREATE";
			task: {
				taskTemplateId: string;
				title: string;
				type: "LOG" | "CHECKLIST" | "PERMIT";
			};
	  }
	| {
			type: "TASK_CANCEL" | "TASK_COMPLETE";
			task: {
				workspaceTaskId: string;
				title: string;
				type: "LOG" | "CHECKLIST" | "PERMIT";
			};
	  }
);


/**
 * Operations:
 *
 * Authentication and Authorization:
 * 		Register
 * 		Assign Role
 * 		Login
 * 		Logout
 *
 *	Tasks:
		  POST Task
		  PUT Task
		  GET Task
 *
 *	COMMMANDS:
 * 		Create COMMAND
 * 		Update COMMAND
 * 		GET COMMAND
 *
 * The Dependency of Sockets
 * 		- This system and api should be supported with a sockets.
 *
 * The Middlewares
 * 		Authentication:
 * 			- Registration Middleware
 * 			- RoleAssign Middleware
 * 			- Authentication Middleware
 *
 * 			- Authorization Middleware
 * 		Tasks:
 * 			- Task CRUD Middleware [Per each user].
 * 			- Get only
 * 		Commands
 * 			- COMMAND CRUD Middleware [Per each User]
 * 			- Get only Waiting COMMANDS for a user.
 *
 *
 * Dashboard:
 * 	 "CAPTAIN": {
 *
 * 	task:[],
 * commands:[]}
	 "ENGINEER": {

			task:[],
			commands:[]
	 }
	 "OFFICER": {

			task:[],
			commands:[]
	 }
	 "CHIEF_ENGINEER": {

			task:[],
			commands:[]
	 }
	 "CHIEF_OFFICER": {

			task:[],
			commands:[]
	 }
	 "CREW": {

			task:[],
			commands:[]
	 }
 *
 */