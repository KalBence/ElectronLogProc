export function fetchLines(logLines, regex) {
  return {
    type: "FETCH_LINES",
    payload: { logLines, regex }
  }
}

export function filterLines(filters) {
  return {
    type: "FILTER_LINES",
    payload: filters
  }
}