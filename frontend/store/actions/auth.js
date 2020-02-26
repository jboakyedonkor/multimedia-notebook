import { AsyncStorage } from 'react-native';

//dispatch action types for redux defined below
export const AUTHENTICATE = 'AUTHENTICATE';


export const authenticate = (userId, token, name) => {
    
    
    return dispatch => {
        //dispatch action to reducer
        dispatch( {type: AUTHENTICATE, userId: userId, token: token, name: name})
    }
}

export const signup = (userSignupInfomation) => {

    const {username, password, email, firstname, lastname} = userSignupInfomation;

    return async dispatch => {
        const response = await fetch(
            'http://10.136.172.26:8000/api/create-user',
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
            .catch(error => console.log(error))

            //handle server error
            if(!response.ok){
                const errorResData = await response.json();
                throw new Error('Something went wrong!');
            }

            //check the returned token
            const resData = await response.json();

            //debug statement, REMEMBER TO REMOVE
            console.log("Printing token object at ACTION " +resData.auth_token);
            console.log('username:' +username);
            console.log('token:' +resData.auth_token);
            console.log('name:' +username+" "+lastname);

            
            //dispatch action to authenticate method
            dispatch(
                authenticate(
                    username,
                    resData.auth_token,
                    firstname+" "+lastname
                )
            );
            
            saveDataToStorage(username, resData.auth_token,firstname+" "+lastname);

            
    }

}



const saveDataToStorage = (userId, token, name) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            name: name
        })
    )

    console.log("successfully saved to async storage");
}