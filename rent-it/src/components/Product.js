import { useParams } from "react-router-dom";
import useProductDetails from "../utils/useProductDetails";
import { Shimmer } from "react-shimmer";
import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Product =() => {
    const {prodid} = useParams();
    const [showModal, setShowModal] = useState(false);
    const userDetails = useSelector((user) => user.login.items);
    const [showError, setShowError] = useState(false);

    const prodData = useProductDetails(prodid);
    const navigate = useNavigate();

    console.log(prodData);

    useEffect(() => {
        if(userDetails.length != 0)
        {
            setShowError(true);
        }
        else{
            setShowError(false);
        }
    });

    const checkIfLogin = () => {
        if(userDetails.length != 0)
        {
            setShowModal(true);
            setShowError(true);
        }
        else{
            setShowModal(false);
            setShowError(false);
        }
    }
    if(prodData !== null)
    {
        return(
            <div className=" flex justify-center">
                <div className="w-10/12 border border-solid opacity-100 flex justify-between">
                    <div className="w-6/12 border border-solid border-x-purple-400 flex justify-center">
                    <span className="opacity-70 absolute bg-black text-red-300 p-2 mr-[200] mt-2 rounded-xl hover:scale-110">Negotiable</span>
                    <img className='w-72 h-84 py-2 rounded-md hover:scale-110' src={
                        prodData.image
                        }
                        ></img>
                    </div>
                    <div className="w-6/12 p-4 m-4">
                        <h1 className="font-bold text-3xl">
                            {prodData.title}
                        </h1>
                        <h5>
                            {prodData.description}
                        </h5>
                        <h3 className="text-red-500 font-bold">
                            Price: ${prodData.price}
                        </h3>
                        <h4>
                            Rating: ⭐{prodData.rating.rate}
                        </h4>
                        <h4>
                            Category: {prodData.category}
                        </h4>

                        <button 
                            onClick={checkIfLogin}
                            className="my-4 rounded-lg bg-blue-100 p-2 cursor-pointer border border-solid">
                            Contact Renter
                        </button>
                        {showModal ? (
                        <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Renter Contact Details
                                </h3>
                                </div>
                                <div className="relative px-6 flex-auto">
                                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                <h5 className="text-sm font-semibold">
                                    Name: 
                                </h5>
                                <h5 className="text-sm font-semibold">
                                    Contact No: 
                                </h5>
                                <h5 className="text-sm font-semibold">
                                    Email Id: 
                                </h5>
                                </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                        ) : null}
                        {!showError ? 
                            <h1 onClick={() => navigate('/Login')} className="cursor-pointer underline text-3xl font-semibold text-red-500">
                                Please login before continue</h1> : null}
                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <Shimmer/>
        )
    }
}

export default Product;