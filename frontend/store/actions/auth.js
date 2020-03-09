import { AsyncStorage } from 'react-native';

//dispatch action types for redux defined below
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const BASE_URL = '10.136.144.47';


export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token) => {


    return dispatch => {
        //dispatch action to reducer
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
}

export const signup = (userSignupInfomation) => {

    const { username, password, email, firstname, lastname } = userSignupInfomation;

    return async dispatch => {
        const response = await fetch(
            `http://${BASE_URL}:8000/api/create-user`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    first_name: firstname,
                    last_name: lastname
                }),
            })
        //.catch(error => console.log(error))

        //handle server error
        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error('Something went wrong!');

        } else {

            //check the returned token
            const resData = await response.json();

            //debug statement, REMEMBER TO REMOVE
            console.log("Printing token object at SIGNUP " + resData.auth_token);
            console.log('username:' + username);
            console.log('token:' + resData.auth_token);


            //dispatch action to authenticate method
            dispatch(
                authenticate(
                    username,
                    resData.auth_token
                )
            );

            saveDataToStorage(username, resData.auth_token);
        }


    }

}

export const login = userLoginInformation => {
    const { username, password } = userLoginInformation;
    return async dispatch => {
        const response = await fetch(
            `http://${BASE_URL}:8000/api/api-token-auth/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
        //.catch(error => console.log(error))

        //handle server error
        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error('Something went wrong!');

        } else {

            //check the returned token
            const resData = await response.json();

            //debug statement, REMEMBER TO REMOVE
            console.log("Printing token object at LOGIN " + resData.token);
            console.log('username:' + username);
            console.log('token:' + resData.token);

            const token = "Token "+resData.token;


            //dispatch action to authenticate method
            dispatch(
                authenticate(
                    username,
                    token
                )
            );

            saveDataToStorage(username, token);
        }


    }

}

export const logout = () => {
    AsyncStorage.removeItem('userData');
    return {type: LOGOUT}
};



const saveDataToStorage = (userId, token) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId
        })
    )

    console.log("successfully saved to async storage");
}