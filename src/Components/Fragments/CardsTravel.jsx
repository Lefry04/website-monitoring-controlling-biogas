import Button from "../Elements/Button";

const CardTravel = (props) => {
    const { children } = props;
    return (
        <div className=" bg-gray-900 p-4 max-w-sm w-full shadow rounded flex flex-col justify-between">
            {children}
        </div>
    )
}

const Header = (props) => {
    const { image } = props;
    return (
        <img src={image} alt="" className="p-3 pb-5 w-full rounded h-20 object-cover" />
    )
}

const Body = (props) => {
    const { children, title } = props;
    return (
        <div className="h-full">
            <h1 className="font-bold text-white text-xl">{title}</h1>
            <p className="text-wrap text-white">{children}</p>
        </div>
    )
}

const Footer = (props) => {
    const { price, handleAddToCart, id } = props;
    return (
        <div className="flex justify-between items-center mt-4">
            <h1 className="text-white text-2xl">Rp. {price}</h1>
            <Button classname="bg-black border border-amber-50 cursor-pointer" onClick={() => handleAddToCart(id)}>Beli Tiket</Button>
        </div>
    )
}

CardTravel.Header = Header;
CardTravel.Body = Body;
CardTravel.Footer = Footer;

export default CardTravel;