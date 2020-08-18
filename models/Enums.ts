export enum Roles {
    CAPTAIN = "CAPTAIN",
    ENGINEER = "ENGINEER",
    OFFICER = "OFFICER",
    CHIEF_ENGINEER = "CHIEF_ENGINEER",
    CHIEF_OFFICER = "CHIEF_OFFICER",
    CREW = "CREW",
    UNASSIGNED = "UNASSIGNED"
}

export enum RolesPower {
    CAPTAIN = 1,
    CHIEF_OFFICER = 2,
    CHIEF_ENGINEER = 3,
    ENGINEER = 4,
    OFFICER = 5,
    CREW = 6,
    UNASSIGNED = 7
}

export enum Devices {
    TABLET = "TABLET",
    DESKTOP = "DESKTOP",
    MOBILE = "MOBILE"
}

export enum OS {
    WINDOWS = "WINDOWS",
    LINUX = "LINUX",
    ANDROID = "ANDROID",
    IOS = "IOS"
}

export enum TaskCommandState {
    WAITING = "WAITING",
    PROCESSED = "PROCESSED",
    CANCELLED = "CANCELLED"
}

export enum WorkspaceTaskType {
    CHECKLIST = "CHECKLIST",
    LOG = "LOG"
}

export enum WorkspaceTaskOperation {
    RECORD = "RECORD",
    APPROVAL = "APPROVAL"
}

export enum WorkspaceTaskState {
    IDLE = "IDLE",
    IN_PROGRESS = "IN-PROGRESS",
    COMPLETE = "COMPLETE",
    CANCELLED = "CANCELLED"
}
export enum TaskCommandType {
    TASK_CREATE = "TASK_CREATE",
    TASK_CANCEL = "TASK_CANCEL",
    TASK_COMPLETE = "TASK_COMPLETE"
}
export enum TaskCommandTaskType {
    LOG = "LOG",
    CHECKLIST = "CHECKLIST",
    PERMIT = "PERMIT"
}