const findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

export const Todos = (state = [], action) => {
    switch (action.type) {
        case "Loding_data":
            return action.data;

        case "Add_ToDo_Parent":
            return [
                ...state,
                {
                    id: action.id,
                    data: action.data
                }
            ]
        // }
        // else {

        //     let index = findWithAttr(state, "id", action.parent);
        //     if (index != -1)
        //         // state[index].childeData != undefined ? state[index].childeData.push(CreateDataChilde(action.id, action.title, action.dateCreate, action.timEstimate, action.done)) :
        //             // state[index].childeData = [CreateDataChilde(action.id, action.title, action.dateCreate, action.timEstimate, action.done)];

        //     return state;
        // }
        case "Delete_ToDo":
            console.log("[Delete_TOdo] state", state);
            console.log('[Delete_TOdo] id', action.id)
            let index = findWithAttr(state, 'id', action.id);
            let s = state.filter((value, index, arr) => {
                return value.id !== action.id
            })
            return (s)


        default:
            return state;
    }
}


const AmitDelevpmet = () => {

}