import { useEffect, useState } from "react";
import ProductList from "./ProductList";

const Rent = () => {

    const [renterName, setRenterName] = useState();
    const [productName, setProductName] = useState();
    const [email, setEmail] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [description, setDescription] = useState();
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const onImageChange = (e) => {
        setImages([...e.target.files]);
    }

    useEffect(() => {
        fetchData();
    });

    const fetchData = async() =>{
        const data = await fetch('https://fakestoreapi.com/products');
        const result = await data.json();
        setProduct(result);
    };

    const rentItem = async () => {
        const res = await fetch('',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(renterName, productName, email, phoneNo, description, images)
        });
        const data = await res.json();

        if(!res.ok)
        {
            return;
        }
    }

    return <section className="py-16 bg-gray-100 font-poppins dark:bg-gray-400">
    <div className="justify-center flex-1 max-w-5xl px-4 py-4 mx-auto lg:py-10 md:px-7">
        <div className="px-8 py-8 bg-white border rounded-md shadow-md dark:border-gray-800 dark:bg-gray-800">
            <form action="">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-00 dark:text-gray-400">
                        Please fill all the instructions related to the item you want to rent:</h2>
                </div>
                <div className="flex flex-wrap mb-4 -mx-2">
                    <div className="w-full px-2 mb-4 lg:mb-0 lg:w-1/2">
                        <input
                            className="w-full px-3 py-2 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                            onChange={(e) => setRenterName(e.target.value)} type="text" placeholder="Renter Name.." required="true"/>
                    </div>
                    <div className="w-full px-2 lg:w-1/2">
                        <input
                            className="w-full px-3 py-2 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                            onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Name of Product to rent" required="true"/>
                    </div>
                </div>
                <input
                    className="w-full px-3 py-2 mb-4 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                    onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Id..." required="true"/>
                <input
                    className="w-full px-3 py-2 mb-4 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                    onChange={(e) => setPhoneNo(e.target.value)} type="number" placeholder="Phone No..." required="true"/>
                <textarea rows="4" type="message" placeholder="Description of product..." required=""
                    onChange={(e) => setDescription(e.target.value)} className="block w-full px-4 mb-4 leading-tight text-gray-700 border rounded bg-gray-50 dark:placeholder-gray-400 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-700 "></textarea>
                <input className="w-full px-3 py-2 mb-4 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                 type="file" multiple accept="image/*" onChange={onImageChange} />
                <button
                    onClick={rentItem}
                    className="w-full py-4 text-sm font-bold leading-normal text-white transition-all duration-300 bg-blue-600 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-700">
                    Send Message
                </button>
            </form>
        </div>
        <div className="mt-4 px-8 py-8 border rounded-md shadow-md bg-gray-400">
        <ul>
        {product.map((prod) => (<li key={prod.id} className="flex">
            <ProductList product={prod}/>
        </li>)
        )}
        </ul>
        </div>
        </div>
    </section>
}

export default Rent;