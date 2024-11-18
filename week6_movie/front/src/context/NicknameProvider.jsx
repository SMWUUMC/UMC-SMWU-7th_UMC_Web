import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [nickname, setNickname] = useState(null);

    const login = () => {};

    return (
        <UserContext.Provider value={{nickname, setNickname, login}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}

