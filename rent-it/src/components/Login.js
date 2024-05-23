import React, {useState, useContext} from "react";
import useLoginDetails from "../utils/useLoginDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/loginSlice";

import phone_icon from '../../image/phone.png';
import email_icon from '../../image/email.png';
import password_icon from '../../image/password.png';
import person_icon from '../../image/person.png';
import unlock_icon from '../../image/unlock1.png';
import AccountContext from "../context/AccountContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [registered, setRegister] = useState(true);
    const [newUser, setNewUser] = useState(false);
    const [loginFail, setLoginFail] = useState(false);
    const [signUpFail, setSignUpFail] = useState(false);

    const[pIcon, setPIcon] = useState(false);
    const[cIcon, setCIcon] = useState(false);

    const{signup, authenticate} = useContext(AccountContext);

    const dispatch = useDispatch();

    const userList = useLoginDetails();
    const navigate = useNavigate();

    const Login = () => {
        setRegister(true);
    }

    const Signup = () => {
        setRegister(false);
    }

    const showPassword = () => {
        var v = document.getElementById("passwordfield");
        if(v.type === "password")
        {
            v.type = "text";
            setPIcon(true);
        }
        else{
            v.type = "password";
            setPIcon(false);
        }
    }

    const showCPassword = () => {
        var val = document.getElementById("cPassword");
        if(val.type === "password")
        {
            val.type = "text";
            setCIcon(true);
        }
        else{
            val.type = "password";
            setCIcon(false);
        }
   }

   //User Registration
   const handleRegistration = (event) => {
        event.preventDefault();
        signup(email,name,password,phoneNo)
            .then(data =>{
                setEmail("");
                setPassword("");
                setPhoneNo("");
                Login();
                setLoginFail(false);
                setNewUser(true);
            })
            .catch(err=>{
                setSignUpFail(true);
            })
    }
    
    //User Login
    const handlelogin = (event) => {
        event.preventDefault();
        authenticate(email, password)
        .then(data =>{
            //localStorage.setItem("Username", data.idToken.payload.name);
            dispatch(addItems(data.idToken.payload));
            navigate("/",{user:{Username:data.idToken.payload.name}});
        })
        .catch(err=>{
            setLoginFail(true);
            setSignUpFail(false);
        })
    }

    return(
        <div className="flex justify-center">
            <div className="p-4 m-4 flex align-middle border border-solid">
                <div className="">
                    <h1 className="text-center text-3xl font-bold">{registered ? "Login Here" : "SignUp Here"}</h1>
                    <form className="" id="login-form">
                        {registered ? 
                        <></> :
                        <div className="">
                            <div className="flex space-x-4 my-6 mx-32">
                                <span className="" id="addon-wrapping">
                                    <img className="w-6" src={person_icon} />
                                </span>
                                <input className='border border-solid border-gray-700 rounded-lg space-x-4 w-64 px-2' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="UserName" aria-label="UserName" aria-describedby="addon-wrapping" />
                                </div>
                        </div>
                        }
                        <div className="">
                            <div className="flex space-x-4 my-6 mx-[120]">
                                <span className="" id="addon-wrapping">
                                    <img className="w-8" src={email_icon} />
                                </span>
                                <input className="border border-solid border-gray-700 rounded-lg space-x-4 w-64 px-2" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                            </div>
                        </div>
                        <div className="">
                            <div className="flex space-x-4 my-6 mx-[120]">
                                <span className="" id="addon-wrapping">
                                    {!pIcon ? <img className="w-8" src={password_icon} onClick={showPassword} /> :
                                    <img src={unlock_icon} onClick={showPassword} /> }
                                </span>
                                <input className="border border-solid border-gray-700 rounded-lg space-x-4 w-64 px-2" value={password} onChange={(e) => setPassword(e.target.value)} id="passwordfield" type="password" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
                            </div>
                        </div>
                        {registered ? 
                        <></> :
                        <div className="">
                            <div className="flex space-x-4 my-6 mx-[120]">
                                <span className="" id="addon-wrapping">
                                {!cIcon ? <img className="w-8" src={password_icon} onClick={showCPassword} /> :
                                    <img src={unlock_icon} onClick={showCPassword} /> }
                                </span>
                                <input className="border border-solid border-gray-700 rounded-lg space-x-4 w-64 px-2" value={cpassword} onChange={(e) => setCPassword(e.target.value)} id="cPassword" type="password" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="addon-wrapping" />
                            </div>
                        </div> 
                        }
                        {registered ? 
                        <></> :
                        <div className="">
                            <div className="flex space-x-4 my-6 mx-[120]">
                                <span className="" id="addon-wrapping">
                                <img className="w-8" src={phone_icon} />
                                </span>
                                <input className="border border-solid border-gray-700 rounded-lg space-x-4 w-64 px-2 text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} id="phoneNo" type="text" placeholder="Enter Phone No."  />
                            </div>
                        </div> 
                        }
                        {registered && newUser && <h6 className="flex space-x-4 my-6 mx-[220] underline text-blue-400 cursor-pointer">Forgot Password?</h6>}
                        {newUser && <h6 className="flex space-x-4 my-6 mx-[220] text-green-500">New User successfully created.</h6>}
                        {!registered &&  <h6 className="flex space-x-4 my-6 mx-[220] underline text-blue-400 cursor-pointer" onClick={Login}>Already a user, Login</h6>}              
                        {registered && !newUser && <h6 className="flex space-x-4 my-6 mx-[220] underline text-blue-400 cursor-pointer" onClick={Signup}>New user, Signup</h6>}
                        {loginFail && <h6 className="flex space-x-4 my-6 mx-[220] text-red-700">Incorrect UserName or Password!!</h6>}
                        {signUpFail && !loginFail && <h6 className="flex space-x-4 my-6 mx-[220] text-red-700">Something went wrong while adding new user. Please try again!!</h6>}
                        <div className="flex space-x-4 my-6 mx-[220]">
                            <button type="button" className="my-4 rounded-lg bg-blue-100 p-2 cursor-pointer border border-solid">Cancel</button>
                            <button type="button" className="my-4 rounded-lg bg-blue-100 p-2 cursor-pointer border border-solid" onClick={!registered ? handleRegistration : handlelogin }>{!registered ? "Signup" : "Login"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;