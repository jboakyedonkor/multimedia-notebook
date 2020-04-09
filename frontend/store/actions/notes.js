import Note from '../../models/note';


export const SET_SEARCHED_NOTES = 'SET_SEARCHED_NOTES';
export const SET_FAVORITE_NOTES = 'SET_FAVORITE_NOTES';
export const SET_NOTES = 'SET_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE'

export const BASE_URL = 'mn-api-ajvco6nb4a-uk.a.run.app';


export const createNote = (name, text, video_link, audio_link, tags = []) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://${BASE_URL}/api/create-note`,
        {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            text,
            video_link,
            audio_link,
            tags
          })
        }
      );

      if (!response.ok) {
        throw new Error('Could not save note. Try again');
      }

      const resData = await response.json();

      //print response from API
      console.log(resData)


      dispatch({
        type: CREATE_NOTE,
        noteData: {
          name: resData.name,
          text: resData.text,
          favorite: resData.favorite,
          video_link: resData.video_link,
          audio_link: resData.audio_link,
          created_at: resData.created_at,
          accessed_at: resData.accessed_at
        }
      });

    } catch (err) {
      throw new Error(err.message);
    }

  };
};


export const deleteNote = (name) => {

  return async (dispatch, getState) => {

    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://${BASE_URL}/api/delete-note`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name
          })
        }
      );

      if (!response.ok) {
        throw new Error('Could not find notes. Something wrong with the server!');
      }

      const resData = await response.json()
      console.log(resData)


      dispatch({ type: DELETE_NOTE, name });



    } catch (err) {
      console.log("server not okay")
      throw new Error(err.message);
    }

  };
}


export const updateNote = (name, text, video_link, audio_link, favorite) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://${BASE_URL}/api/update-note`,
        {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            text,
            favorite,
            video_link,
            audio_link
          })
        }
      );


      const resData = await response.json();

      //print response from API
      console.log(resData)

      dispatch({
        type: UPDATE_NOTE,
        noteData: {
          name: resData.name,
          text: resData.text,
          favorite: resData.favorite,
          video_link: resData.video_link,
          audio_link: resData.audio_link,
          created_at: resData.created_at,
          accessed_at: resData.accessed_at
        }
      });

    } catch (err) {
      console.log("server not okay")
      throw new Error(err.message);
    }
  };
};


export const fetchNotes = () => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://${BASE_URL}/api/get-note`,
        {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: ""
          })
        }
      );

      if (!response.ok) {
        console.log("All notes could not be fetched")
        //throw new Error('Could not find notes. Something wrong with the server!');
      }

      const resData = await response.json()
      //console.log(resData)

      const loadedNotes = [];

      for (const key in resData) {

        //console.log(resData[key])
        loadedNotes.push(
          new Note(
            resData[key].name,
            resData[key].text,
            resData[key].video_link,
            resData[key].audio_link,
            resData[key].created_at,
            resData[key].accessed_at,
            resData[key].favorite
          )
        );
      }

      dispatch({ type: SET_NOTES, allNotes: loadedNotes });



    } catch (err) {
      console.log("could not find favorite notes")
      throw new Error(err.message);
    }

  };
};


export const searchNotes = (name) => {
  return async (dispatch, getState) => {

    dispatch({ type: SET_SEARCHED_NOTES, noteToFind: name });

  };
};

export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_FAVORITE_NOTES });
  };
};

export const updateFavorites = (name, text, favorite, video_link, audio_link, created_at, accessed_at) => {
  return async (dispatch, getState) => {
    if (!favorite === true) {             //add to favorites
      dispatch({
        type: ADD_TO_FAVORITE,
        noteData: {
          name,
          text,
          favorite: !favorite,
          video_link,
          audio_link,
          created_at,
          accessed_at
        }
      });
    } else {                            //remove from favorites
      dispatch({ type: REMOVE_FROM_FAVORITE, noteToRemove: name })
    }
  }
}

