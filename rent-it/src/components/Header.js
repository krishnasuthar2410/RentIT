
import logo_icon from '../../image/logo.jpg'
import {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItem} from '../utils/loginSlice';
import setting_icon from '../../image/setting.png'
import person_icon from '../../image/person.png'

const Header = () => {

    const [btnLogin,setLogin] = useState("Login");
    const userDetails = useSelector((user) => user.login.items);
    console.log(userDetails);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(userDetails.length != 0)
        {
            setLogin("Logoff");
        }
        else
        {
            setLogin("Login");
        }
    });

    const handleLogin = () => {
        if(btnLogin === "Login")
        {
            navigate('/login');
        }
        else{
            dispatch(removeItem());
            navigate('/');
        }
    }

    return (
            <div className='flex justify-between p-4 m-4 shadow-lg'>
                <div className='w-32'>
                    <img id ="logo" src={logo_icon}></img>
                </div>
                <div className='p-6 m-6 align-middle'>
                    <ul className='flex font-medium'>
                        <li className='px-4 hover:cursor-pointer hover:text-gray-600'><Link to="/" >Home</Link></li>
                        <li className='px-4 hover:cursor-pointer hover:text-gray-600'><Link to="/about" >About Us</Link></li>
                        <li className='px-4 hover:cursor-pointer hover:text-gray-600'><Link to="/contact" >Contact Us</Link></li>
                        {
                            btnLogin !== 'Login' && 
                            <>
                                <li className='px-4 hover:cursor-pointer hover:text-gray-600'><Link to="/rent" >Renting</Link></li>
                            </>
                        }
                        {userDetails !== null && <li className='px-4 hover:cursor-pointer hover:text-gray-600 bg-gray-300 rounded-md'>
                            <button onClick={handleLogin} className='btn-login'>{btnLogin}</button></li> }
                        </ul>
                </div>
            </div>
    )
}



export default Header;