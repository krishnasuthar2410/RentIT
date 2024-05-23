import { useEffect, useState } from "react";

const ProductList = ({product}) => {
    
    const [editMode, setEditMode] = useState(false);
    const [priceVal, setPriceVal] = useState(product);
    const deleteProduct = () => {
        setEditMode(!editMode);
    }

    const updateProduct = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
    }, [priceVal]);

    return <>
        <img className='w-20 h-20 py-2 rounded-md' src={
                product.image
            }
            ></img>
            <h2 className="font-bold align-middle text-white text-lg p-1 mt-6 px-6">{product.title}</h2>
            {editMode ?
                <input type="text" className="h-8 mt-6 bg-inherit" value={priceVal.price} 
                    onChange={(e) => setPriceVal({...priceVal, "price":e.target.value})}/> :
                <h2 className="font-bold align-middle text-white text-lg p-1 mt-6 px-6">${priceVal.price}</h2>
            }
            {editMode && <button className="cursor-pointer" onClick={updateProduct}>✔️</button> }
            <button className="cursor-pointer px-2" onClick={deleteProduct}>✏️</button>
            <button className="cursor-pointer px-2" onClick={deleteProduct}>❌</button>
    </>
}

export default ProductList;