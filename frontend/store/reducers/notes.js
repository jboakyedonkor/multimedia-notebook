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
      case UPDATE_NOTE:
        const noteIndex = state.searchedNotes.findIndex(
          note => note.name === action.noteData.name
        );

        const updatedNote = new Note(
          action.noteData.name,
          action.noteData.text,
          action.noteData.video_link,
          action.noteData.audio_link,
          action.noteData.created_at,
          action.noteData.accessed_at,
          action.noteData.favorite
        );

        const updatedSearchedNotes = [...state.searchedNotes];
        updatedSearchedNotes[noteIndex] = updatedNote;

        return {
          ...state,
          searchedNotes: updatedSearchedNotes
        };

      case DELETE_NOTE:
        return {
          ...state,
          searchedNotes: state.searchedNotes.filter(
            note => note.name !== action.name
          )
        }

    }
    return state;

  };
  


