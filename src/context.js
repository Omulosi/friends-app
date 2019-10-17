import React, { useReducer, createContext } from 'react';
import { FriendsReducer } from './store/reducers/friends_reducer';
import { useProvideAuth } from './utils/auth';


export const FriendsContext = createContext();
export const AuthContext = createContext();
export const FormContext = createContext();

export const FriendsContextProvider = props => {
  
  const friendsHook = useReducer(FriendsReducer,
    {friends: [], current: {name:'', age:'',email:''}});

  return (
    <FriendsContext.Provider value={friendsHook}>
      {props.children}
    </FriendsContext.Provider>
  )
}

export const AuthContextProvider = props => {
  const authHook = useProvideAuth();

  return (
    <AuthContext.Provider value={authHook}>
      {props.children}
    </AuthContext.Provider>
  )
}
