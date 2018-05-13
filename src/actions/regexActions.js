export function addRegex(regex) {
    return {
      type: "ADD_REGEX",
      payload: regex
    }
  }

  export function selectRegex(selected) {
    return {
      type: "SELECT_REGEX",
      payload: selected
    }
  }

  export function getSelected() {
    return {
      type: "GET_SELECTED"
    }
  }