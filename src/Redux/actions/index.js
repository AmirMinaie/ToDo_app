export const notify_Type = {
    Error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
}

export const To_do_Parent = (title, dateCreate, childe = []) => {
    return { title, dateCreate, childe }
}

export const To_do_childe = (id, title, dateCreate, timEstimate, parentId) => {
    return { id, title, dateCreate, timEstimate, parentId }
}

export const Add_ToDo_Parent = (id, data) => {
    return {
        type: 'Add_ToDo_Parent',
        id: id,
        title: data
    }
}

export const Loding_data = (data) => {
    return {
        type: "Loding_data",
        data: data

    }
}

export const Delete_ToDo = (id) => {
    return {
        type: 'Delete_ToDo',
        id,
    }
}
export const ToggleToDo = id => {
    return {
        type: "Toggle_ToDo",
        id
    }
}

export const ShowNotify = (severity, message) => {
    return {
        type: "Show_Notify",
        isOpen: true,
        message,
        severity
    }

}
export const HidenNotify = () => {
    return {
        type: "Hiden_Notify",
        isOpen: false,
        // message:" ",
        // severity:"error"
    }
}