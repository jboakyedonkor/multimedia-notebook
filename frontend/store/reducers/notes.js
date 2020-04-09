import { SET_NOTES, SET_SEARCHED_NOTES, SET_FAVORITE_NOTES, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from '../actions/notes';
import Note from '../../models/note'


const initialState = {
  allNotes: [],
  searchedNotes: [],
  favoriteNotes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        allNotes: action.allNotes
      }

    case SET_SEARCHED_NOTES:
      if (action.noteToFind.trim().length == 0) {
        return {
          ...state,
          searchedNotes: []
        };
      } else {
        const filteredNotes = state.allNotes.filter(({ name }) =>
          name.toLowerCase().includes(action.noteToFind.toLowerCase())
        )

        return {
          ...state,
          searchedNotes: filteredNotes
        }
      };

    case SET_FAVORITE_NOTES:
      const favorites = state.allNotes.filter(({ favorite }) =>
        favorite === true
      );

      return {
        ...state,
        favoriteNotes: favorites
      }

    case CREATE_NOTE:
      const newNote = new Note(
        action.noteData.name,
        action.noteData.text,
        action.noteData.video_link,
        action.noteData.audio_link,
        action.noteData.created_at,
        action.noteData.accessed_at,
        action.noteData.favorite
      );

      return {
        ...state,
        allNotes: state.allNotes.concat(newNote)
      };
    case UPDATE_NOTE:
      const noteIndex = state.allNotes.findIndex(
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

      const updatedNotes = [...state.allNotes];
      updatedNotes[noteIndex] = updatedNote;

      //next check to see if searched note needs to be updated
      const indexInSearch = state.searchedNotes.findIndex(
        note => note.name === action.noteData.name
      );
      const updatedSearchedNotes = [...state.searchedNotes];
      if (indexInSearch >= 0) {
        updatedSearchedNotes[indexInSearch] = updatedNote;
      }

      return {
        ...state,
        allNotes: updatedNotes,
        searchedNotes: updatedSearchedNotes
      };

    case DELETE_NOTE:
      return {
        ...state,
        allNotes: state.allNotes.filter(
          note => note.name !== action.name
        ),
        searchedNotes: state.searchedNotes.filter(
          note => note.name !== action.name
        ),
        favoriteNotes: state.favoriteNotes.filter(
          note => note.name !== action.name
        )
      }

    case ADD_TO_FAVORITE:
      const newFavNote = new Note(
        action.noteData.name,
        action.noteData.text,
        action.noteData.video_link,
        action.noteData.audio_link,
        action.noteData.created_at,
        action.noteData.accessed_at,
        action.noteData.favorite
      );
      return {
        ...state,
        favoriteNotes: state.favoriteNotes.concat(newFavNote)
      };

    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favoriteNotes: state.favoriteNotes.filter(
          note => note.name !== action.noteToRemove
        )
      };

  }
  return state;

};



