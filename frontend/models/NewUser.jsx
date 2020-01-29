{/*
    This will be a schema for creating new users
*/}

class NewUser{

    //subject to change
    constructor(id, firstName, lastName, email, password){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export default NewUser;