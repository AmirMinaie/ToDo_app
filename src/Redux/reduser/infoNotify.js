const ini = { isOpen: false, message: "", severity: "error" }

export const infoNotify = (state = ini, action) => {
    switch (action.type) {
        case "Hiden_Notify":
                return {
                    isOpen: action.isOpen,
                    message: state.message,
                    severity: state.severity
                }
        case "Show_Notify":
            return {
                isOpen: action.isOpen,
                message: action.message,
                severity: action.severity
            }
        default:
            return state;
    }

}