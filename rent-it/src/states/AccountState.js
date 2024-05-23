import React from "react";
import AccountContext from "../context/AccountContext";
import userPool from "./userPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

const AccountState = (props) => {

    //User Registeration
    const signup = async(email, name, password, phoneNo) => {
        return await new Promise((resolve, reject) => {
            var attributeList = [];

            var UserName = {
                Name:"name", Value: name
            }

            attributeList.push(UserName);

            var PhoneNo = {
                Name:"phone_number", Value: '+15555555555'
            }

            attributeList.push(PhoneNo);

            userPool.signUp(email, password, attributeList, null, (err, data) =>{
                if(err){
                    reject();
                }
                else{
                    resolve();
                }
            })
        })
    }

    //User Login
    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) =>{
            const user = new CognitoUser({Username,Pool:userPool})

            const authDetails = new AuthenticationDetails({ Username, Password })

            user.authenticateUser(authDetails, {
                onSuccess:(data) => {
                    console.log("Login Successful", data);
                    resolve(data);
                },
                onFailure:(err) => {
                    console.log("Login Failuer", err);
                    reject(err);
                },
                newPasswordRequired:(data)=>{
                    console.log("New Password Required", data)
                }
            })
        })
    }

    return (
        <AccountContext.Provider value={{signup, authenticate}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;