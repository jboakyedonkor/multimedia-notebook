import User from '../../models/user';

export const SET_USER_INFO = 'SET_USER_INFO';
export const BASE_URL = 'mn-api-ajvco6nb4a-uk.a.run.app';


export const getUserInfo = () => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(
                `https://${BASE_URL}/api/get-user`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                console.log("response not okay")
                throw new Error('Could not find user info. Something wrong with the server!');
            }

            const resData = await response.json()

            userInfo = new User (
                resData.first_name,
                resData.last_name,
                resData.email,
                resData.language
            )
            
            dispatch({type: SET_USER_INFO, userInfo: userInfo});


        } catch (err) {
            throw new Error(err.message);
        }
    }

}

export const updatePassword = (old_password, new_password) => {
    return async (dispatch, getState) => {
      // any async code you want!
      const token = getState().auth.token;
  
      try {
        const response = await fetch(
          `https://${BASE_URL}/api/update-password`,
          {
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              old_password,
              new_password
            })
          }
        );
  
  
        const resData = await response.json();
  
        //print response from API
        console.log(resData)
  
      } catch (err) {
        throw new Error(err.message);
      }
  
    };
  };


  export const resetLink = (email) => {
    return async (dispatch, getState) => {
      // any async code you want!
      const token = getState().auth.token;
  
      try {
        const response = await fetch(
          `https://${BASE_URL}/api/password/reset/`,
          {
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email
            })
          }
        );
  
  
        const resData = await response.json();
  
        //print response from API
        console.log(resData)
  
      } catch (err) {
        throw new Error(err.message);
      }
  
    };
  };
