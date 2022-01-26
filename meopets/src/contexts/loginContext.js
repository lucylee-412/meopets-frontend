import axios from "axios";
import React, { useState } from "react";

/* login/user Context. Here is where the global state gets defined. */

/* context provider */
export const UserContext = React.createContext({
    token: {},
    isLoggedIn: {},
    username: {},
    userPets: {},
    signUp: (email, username, password) => {},
    logIn: (username, password) => {},
    getPets: () => {},
    logOut: () => {}
});

export default function Users(props) {
    // Context's states - user and active user's pet(s)
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState("");
    const [userPets, setUserPets] = useState(null);
    const isLoggedIn = !!token;
    console.log(token);

    // Login function. Sends the POST request to the login route with username and password as bodies. 
    // More error handling might be needed tbh (or handling errors from the API).
    async function logIn(username, password) {
        const response = await axios.post('https://virtual-pets.herokuapp.com/login', {
            username: username,
            password: password
        });
        // Assuming login went well, the user state is updated with the response data.
        setToken(response.data.token);
        setUsername(username);
        return response;
    }

    // Signup function. Similar to login, except here we're creating a new account. POST. 
    // Request body also includes email. These are also validated on the backend for duplicates,
    // but that kind of handling needs to be included for the user somehow (we can even do it automatically when
    // the user stops typing (with debouncer - see my City and Giphy apps) though I'd need to add another route).
    async function signUp(email, username, password) {
        const response = await axios.post('https://virtual-pets.herokuapp.com/signup', {
            email: email,
            username: username,
            password: password
        });
        // The user is automatically signed in (this can be changed, of course).
        setToken(response.data.token);
        setUsername(username);
        return response;
    }

    async function getPets() {
        if (isLoggedIn) {
            try {
                const userPet = await axios.get('https://virtual-pets.herokuapp.com/pets', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
                });
                console.log(userPet);
                setUserPets(userPet.data.pet)
                return userPet.data.pet;
            } catch(err) {
                console.log(err.error);
            }
        }
    }

    function logOut() {
        setToken(null);
        setUsername("");
    }

    // The context component is provided to all the children together with all the values we specified here.
    return (
        <UserContext.Provider value={{
            token: token, 
            isLoggedIn: isLoggedIn,
            username: username, 
            userPets: userPets, 
            signup: signUp, 
            login: logIn, 
            getPets: getPets, 
            logout: logOut
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

