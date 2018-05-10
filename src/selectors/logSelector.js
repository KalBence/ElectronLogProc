import { createSelector } from 'reselect'

const getLines = (state) => state.lines.lines
const getLevel = (state) => state.lines.level
const getMessage = (state) => state.lines.message
const getTime = (state) => state.lines.time

const getFilteredLines = createSelector(
    [ getLines, getLevel, getMessage, getTime ],
    (lines, level, message, time) => {

        time = new Date(time);

        var filteredLines1 = lines.filter(function (el) {
            if (el.message == null && message != "")
                return false;
            else if (el.message == null && message == "") 
                return true;
            if (el.level == null && level != "")
                return false;
            else if (el.level == null && level == "") 
                return true;
                
            return el.message.toLowerCase().includes(message.toLowerCase()) &&
                    el.level.toLowerCase().includes(level.toLowerCase())
        });

        var filteredLines2 = filteredLines1.filter(function (el) {
            console.log(time + " log time: " + el.time);
            if (el.time < time)
                return false;
            else 
                return true;
        });

        return filteredLines2;
    }
)

export default getFilteredLines