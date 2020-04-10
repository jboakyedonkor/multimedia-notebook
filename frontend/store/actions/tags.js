import Tag from '../../models/tag';


export const SET_POPULAR_TAGS = 'SET_POPULAR_TAGS';
export const SET_FAVORITE_TAGS = 'SET_FAVORITE_TAGS';
export const DELETE_POPULAR_TAG = 'DELETE_POPULAR_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE'

export const BASE_URL = 'mn-api-ajvco6nb4a-uk.a.run.app';




export const fetchPopularTags = () => {
    return async (dispatch, getState) => {
  
      const token = getState().auth.token;
      try {
        const response = await fetch(
          `https://${BASE_URL}/api/get-tag`,
          {
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              popularity: true
            })
          }
        );
  
        if (!response.ok) {
          console.log("Could not fetch popular tags")
          //throw new Error('Could not find notes. Something wrong with the server!');
        }
  
        const resData = await response.json()
        //console.log(resData)
  
        const loadedTags = [];
  
        for (const key in resData) {
  
          loadedTags.push(
            new Tag(
              resData[key].name,
              resData[key].favorite,
              resData[key].popularity,
              resData[key].created_at,
              resData[key].accessed_at
            )
          );
        }

        //console.log(loadedTags)
  
        dispatch({ type: SET_POPULAR_TAGS, popularTags: loadedTags });
  
  
  
      } catch (err) {
        console.log("could not fetch popular tags")
        throw new Error(err.message);
      }
  
    };
  };


  export const deletePopularTag = (name) => {

    return async (dispatch, getState) => {
  
      const token = getState().auth.token;
  
      try {
        const response = await fetch(
          `https://${BASE_URL}/api/delete-tag`,
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
          throw new Error('Could not delete tag, try again!');
        }
  
        const resData = await response.json()
        console.log(resData)
  
  
        dispatch({ type: DELETE_POPULAR_TAG, name });
  
  
  
      } catch (err) {
        console.log("server not okay")
        throw new Error(err.message);
      }
  
    };
  }


  export const updatePopularTagFavorite = (name, favorite) => {
    return async (dispatch, getState) => {
      // any async code you want!
      const token = getState().auth.token;
  
      try {
        const response = await fetch(
          `https://${BASE_URL}/api/update-tag`,
          {
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              favorite: !favorite
            })
          }
        );
  
  
        const resData = await response.json();
  
        //print response from API
       //console.log(resData)
  
        dispatch({
          type: UPDATE_TAG,
          tagData: {
            name: resData[0].name,
            favorite: resData[0].favorite,
            popularity: resData[0].popularity,
            created_at: resData[0].created_at,
            accessed_at: resData[0].accessed_at
          }
        });
  
      } catch (err) {
        console.log("server not okay")
        throw new Error(err.message);
      }
    };
  };