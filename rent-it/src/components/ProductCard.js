
const ProductCard = (props) => {

    const{prodData} = props;

    return(
        <div className="w-64 h-full box-border rounded-md shadow-md px-4 bg-gray-100 hover:bg-gray-200">
            <span className="opacity-70 absolute bg-black text-red-400 p-2 m-2 rounded-xl hover:scale-110">Negotiable</span>
            <img className='w-full h-48 py-2 rounded-md hover:scale-125' src={
                prodData.image
            }
            ></img>
            <h2 className="font-bold text-lg p-1 hover:text-xl">{prodData.title}</h2>
            <h5>Rating: ⭐{prodData.rating.rate}</h5>
            <h3 className="text-red-500 font-bold">Price: ${prodData.price}</h3>
        </div>
    )
}


export default ProductCard;