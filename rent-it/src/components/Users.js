import { useEffect } from "react";

const Users = (params) =>{


    useEffect(()=>{

        const timer = setInterval(()=>{
            console.log("Set Interval");
        }, 1000);

        return(()=>{
            clearInterval(timer);
        });
    }, []);

    const {component, name, location, contact} = params;
    return(
        <div className="user-card">
            <h1>{component}</h1>
            <h1>Name: {name}</h1>
            <h2>Address: {location}</h2>
            <h2>Contact: {contact}</h2>
        </div>
    )
}

export default Users;