export default function reducer(state={
    lines: ["Open file"]
}, action) {
    switch (action.type) {
        case "FETCH_LINES":
        {
            return {
                ...state,
                lines: action.payload
            }
        }
    }

    return state;
}