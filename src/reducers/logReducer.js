export default function reducer(state={
    lines: [{message : "Open a log file"}],
    ogLines: []
}, action) {
    switch (action.type) {
        case "FETCH_LINES":
        {
            return {
                ...state,
                lines: action.payload,
                ogLines: action.payload
            }
        }
        case "FILTER_LINES":
        {
            console.log("-"+action.payload.message.toLowerCase()+"-");
            var filteredLines = state.ogLines.filter(function (el) {
                if (el.message == null && action.payload.message != "")
                    return false;
                else if (el.message == null && action.payload.message == "") 
                    return true;
                if (el.level == null && action.payload.level != "")
                    return false;
                else if (el.level == null && action.payload.level == "") 
                    return true;
                    
                return el.message.toLowerCase().includes(action.payload.message.toLowerCase()) &&
                       el.level.toLowerCase().includes(action.payload.level.toLowerCase())
            });
            return {
                ...state,
                lines: filteredLines
            }
        }
    }

    return state;
}