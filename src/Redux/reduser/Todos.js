
const rowData = [
    [0, "Amir", "1399", 45, [
        [3, "titile3", "1232", 12, true],
        [4, "titile4", "1232", 3, false],
        [5, "titile5", "1232", 2, true]]
    ],
    [1, "ALi", "1394", 100, [
        [6, "titile6", "1232", 11, true],
        [7, "titile7", "1232", 1, true],
        [8, "titile8", "1232", 2, false]]
    ],
    [2, "Mohamad", "1394", 5, [
        [9, "titile9", "1232", 13, true],
        [10, "titile10", "1232", 15, true],
        [11, "titile11", "1232", 18, true]]
    ]];

const CreateDataChilde = (id, title, dateCreate, timEstimate, done) => {
    return {
        id,
        title,
        dateCreate,
        timEstimate,
        done
    }
}
const createData = (id, title, dateCreate, timEstimate, childsData) => {
    console.log("[createData]", id, title, dateCreate, timEstimate, childsData);
    let sumTime = 0;
    let sumNotDone = 0;
    childsData.map((child) => { sumNotDone += child[4] ? 0 : child[3]; sumTime += child[3] });
    let persnge = 100 * sumNotDone / sumTime;
    return {
        id,
        title,
        dateCreate,
        timEstimate,
        persnge,
        childeData: childsData.map((child) => { return { ...CreateDataChilde(...child) } })
    };
}
const row = [...rowData.map((data) => createData(...data))]

const findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

export const Todos = (state = row, action) => {
    switch (action.type) {
        case "Add_ToDo":
            // console.log('[reuser]', state, action)
            if (action.parent === 'null') {
                return [
                    ...state,
                    {
                        id: action.id,
                        title: action.title,
                        dateCreate: action.dateCreate,
                        timEstimate: action.timEstimate,
                        child: []
                    }
                ]
            }
            else {

                let index = findWithAttr(state, "id", action.parent);
                if (index != -1)
                    state[index].childeData != undefined ? state[index].childeData.push(CreateDataChilde(action.id, action.title, action.dateCreate, action.timEstimate, action.done)) :
                        state[index].childeData = [CreateDataChilde(action.id, action.title, action.dateCreate, action.timEstimate, action.done)];

                return state;
            }
        case "Delete_ToDo":
            console.log("[Delete_TOdo] state", state);
            console.log('[Delete_TOdo] id', action.id)
            let index = findWithAttr(state, 'id', action.id);
            let s = state.filter((value, index, arr) => {
                return value.id != action.id
            })
            console.log('[Delete_TOdo] index', index)
            console.log('[Delete_TOdo] s', s)
            return (s)


        default:
            console.log('[reuser]', state, action)
            return state;
    }
}


const AmitDelevpmet = ()=>{
    
}