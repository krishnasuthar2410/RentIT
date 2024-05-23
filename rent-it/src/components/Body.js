import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

const Body = () => {

    const [listProduct, setproduct] = useState([]);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch('https://fakestoreapi.com/products');
        const result = await data.json();
        setproduct(result);
    };

    return (
        <div className='justify-between'>
            <div className='flex flex-wrap p-4 m-4 gap-5'>
            {listProduct.map((product) => 
                (<Link key={product.id} to={"/product/"+product.id}>
                    <ProductCard prodData={product}/>
                </Link>)
                )}
            </div>            
        </div>
    )
}

export default Body