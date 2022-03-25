//provides info about the logged in user 
//Review of providers
//Create Context from React
//createContext will give us abck an objecct that has 
//a consumer and provider
//a way to 'consume' data and a way to 'provide' data 
//consume data 

import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

//first create  the context called AuthContext
const AuthContext = React.createContext();
//then a consumer const that is exportable; 
//this is what child components will use to get data
//from this provider 
export const AuthConsumer = AuthContext.Consumer;
//create provider (a react component)

const AuthProvider = ({ children }) => {
  //null because a null user is a not authenticated user
  //not logged in; if i have a user, they will be authenticated (not null)
  const [user, setUser] = useState(null)
  
  const navigate = useNavigate()

  //expect to be given a user from the form; called onSubmit 
  //on a register page 
    const handleRegister = async (user)=>{
        console.log('going to create user in handleRegister:', user)
        try{
            let res = await axios.post('/api/auth',user)
            setUser(res.data.data)
            navigate('/')
            // setUser
        } catch(err){
          // potentially a lot of work here
          // show why it didn't work (good UX)
            alert('error: unable to register, do you have a unique/valid email, is password greater than 6')
            console.log(err)
        }
    }
  
    const handleLogin = async (user)=>{
        console.log('going to login user in handleLogin:', user)
        try{
            // this call will give us back the user from DB
            // assuming email and password are correct
            let res = await axios.post('/api/auth/sign_in',user)
            setUser(res.data.data)
            navigate('/')
            // setUser
        } catch(err){
            // potentailly a lot of work here
            alert('error Logining in is email and password valid?')
            console.log(err)
        }
    }
  
     const handleLogout = async ()=>{
        console.log('going to logout user in handleLogin:')
        try{
            // NEED TO SEND TOKEN: DONe WITH HELP INITMIDDLEWARE
            let res = await axios.delete('/api/auth/sign_out')
            setUser(null)
            navigate('/login')
            // setUser
        } catch(err){
            alert('error Logining out did you send the token?')
            console.log(err)
        }
    }
  }
  //we pass prop 'value' any data we want accessible to other components

  return (
    <AuthContext.Provider value={{
      // if a user is logged in, we will want their data 
      //so we will pass in the user object as state
      user, 
      //a helper boolean to tell us if user if logged in or not
      authenticated: user !== null,
      //handles registration of a user. makes a post request to "api/auth" 
      //to create a user 
      handleRegister: handleRegister,
      //handles the login of a user; makes a post request to "api/auth/sign_in"
      //to authenticate a user  
      handleLogin: handleLogin,
      //handles the logout of a user; makes a delete request to 
      //"api/auth/sign_out" to logout a user 
      handleLogout: handleLogout,
      //function that gets the user from our database and sets
      //it to our user state 
      setUser: (user) => setUser(user)
    }}>
      { children }
  {/* wrap our componenet with <AuthProvider> component */}
    </AuthContext.Provider>
  ) 
};

export default AuthProvider;