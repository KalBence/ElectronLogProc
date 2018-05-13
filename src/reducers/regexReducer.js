export default function reducer(state={
    regex: [{
        name : "ASP .Net Core Serilog",
        rgx : new RegExp(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}).\d*\+\d{2}:\d{2} .{0,13} (\[INF\]|\[DBG\]|\[WRN\]) (.*)/),
        levelN : 2,
        dateN : 1,
        msgN : 3
      }],
    selected: 0,
    selectedRegex: {},
}, action) {
    switch (action.type) {
        case "ADD_REGEX":
        {
            state.regex.push(action.payload);
            return {
                ...state
            }
        }
        case "SELECT_REGEX":
        {
            state.selected = action.payload
            //console.log(action.payload);
            return {
                ...state
            }
        }
        case "GET_SELECTED":
        {
            console.log(state.regex[state.selected]);
            return {
                ...state,
                selectedRegex : state.regex[state.selected]
            }
        }
    }

    return state;
}