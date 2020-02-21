import { ASANA, ASANA_ERROR, ASANA_USER_DATA, ASANA_DATA_ERROR} from "./../actions/types";

const INITIAL_STATE = {
    asana_success: "",
    asana_error: "",
    asana_data: "",
    asana_data_error: "",
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case ASANA:
        return { ...state, asana_success: action.payload };
      case ASANA_ERROR:
        return { ...state, asana_error: action.payload };
      case ASANA_USER_DATA:
        return { ...state, asana_data: action.payload };
      case ASANA_DATA_ERROR: 
        return { ...state, asana_data_error: action.payload }
      default:
        return state;
    }
  }
  