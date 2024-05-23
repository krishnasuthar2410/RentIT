import { useRouteError } from "react-router-dom";

const Error = () =>{

    const errormsg = useRouteError();
    return <div>
        <h1>Oops!!!!!!</h1>
        <h2>Page not found</h2>
        <h3><i>{errormsg.status}: {errormsg.statusText}</i></h3>
    </div>
};

export default Error;