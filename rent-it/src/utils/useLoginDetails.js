import { useEffect, useState } from "react";

const useLoginDetails = () => {
    const [prodData, setProdData] = useState(null);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch('https://fakestoreapi.com/users');
        const jsonData = await data.json();
        setProdData(jsonData);
    };
    return prodData;
}

export default useLoginDetails;