let nexttodo = 100;
export const Add_ToDo = (title, dateCreate, timEstimate, parent) => {
    return {
        type: 'Add_ToDo',
        id: nexttodo++,
        title,
        dateCreate,
        timEstimate,
        parent
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