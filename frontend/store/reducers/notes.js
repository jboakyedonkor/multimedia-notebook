import { SET_NOTES, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE} from '../actions/notes';
import Note from '../../models/note'


const initialState = {
    searchedNotes: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_NOTES:
        return {
          searchedNotes: action.searchedNotes
        };
    }
    return state;
  };
  


