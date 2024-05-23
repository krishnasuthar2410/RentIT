import { useEffect, useState } from "react";

const useProductDetails = (prodid) => {
    const [prodData, setProdData] = useState(null);

    console.log("1");

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch('https://fakestoreapi.com/products/'+ prodid);
        const jsonData = await data.json();
        setProdData(jsonData);
    };
    return prodData;
}

export default useProductDetails;