export function fetchLines(logLines) {
    return {
      type: "FETCH_LINES",
      payload: logLines
    }
  }