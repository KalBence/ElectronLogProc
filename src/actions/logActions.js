export function fetchLines(logLines) {
  return {
    type: "FETCH_LINES",
    payload: logLines
  }
}

export function filterLines(filters) {
  return {
    type: "FILTER_LINES",
    payload: filters
  }
}