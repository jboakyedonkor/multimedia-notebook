import Note from '../../models/note';


export const SET_NOTES = 'SET_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const BASE_URL = '10.136.144.47';


export const fetchNotes = () => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        console.log("HERE AT ACTION: "+token)
        try {
            const response = await fetch(
                `http://${BASE_URL}:8000/api/get-note`, {
                    headers: {
                        'Authorization': token
                    }
                }
            )

            if(!response.ok){
                console.log("response not okay")
                throw new Error ('Could not load notes. Something wrong with the server!');
            }

            const resData = await response.json();
            console.log("Data from server: "+resData);
            //const loadedNotes = [];
            /*
            for (const id in resData){
                loadedNotes.push(
                    new Note(
                        id,
                        resData[id] 

                    )
                )
            }
            */

        } catch (err) {
            console.log("server not okay")
            throw new Error ('Could not load notes. Something went wrong!');
        }

    };
};