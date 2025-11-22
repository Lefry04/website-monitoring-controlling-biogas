import CardTravel from "../Components/Fragments/CardsTravel";
import Button from "../Components/Elements/Button";
import { useState, useEffect, useRef, use } from "react";
import { getProducts } from "../services/product.service";
import { data } from "react-router-dom";

const email = localStorage.getItem("email");

const Products = () => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const list = products.find((list) => list.id === item.id);
                return acc + (list.price * item.quantity);
            }, 0);
            setTotal(sum);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        window.location.href = "/login";
    }

    const handleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
            setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { id, quantity: 1 }]);
        }
    }

    const totalRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
            totalRef.current.style.display = "table-row";
        }
        else {
            totalRef.current.style.display = "none";
        }
    }, [cart]);

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <div>
            <div className="bg-blue-300 h-20 font-bold flex justify-end items-center pr-10">
                {email}
                <Button classname="bg-black ml-10" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="flex justify-center p-6 gap-3 w-screen flex-wrap">
                {products.length &&
                    products.map((item) => (
                        <CardTravel key={item.id}>
                            <CardTravel.Header image={item.image} />
                            <CardTravel.Body title={item.title}>
                                {item.description.substring(0, 100)}...
                            </CardTravel.Body>
                            <CardTravel.Footer price={item.price} id={item.id} handleAddToCart={handleAddToCart} />
                        </CardTravel>
                    ))}
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1>Cart</h1>
                <table className="text-left border-separate border-spacing-x-5 tabel-auto">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 &&
                            cart.map((item) => {
                                const list = products.find((list) => list.id === item.id);
                                return (
                                    <tr key={item.id}>
                                        <td>{list.title}</td>
                                        <td>{item.quantity}</td>
                                        <td>{list.price}</td>
                                        <td>{item.quantity * list.price}</td>
                                    </tr>
                                )
                            })}
                        <tr ref={totalRef}>
                            <td colSpan={3}>
                                <b>Total Price</b>
                            </td>
                            <td>
                                <b>
                                    {total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                                </b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products;