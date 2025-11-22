import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { useEffect, useRef } from "react";

const Form = () => {

    const handleLogin = (event) => {
        event.preventDefault();
        // localStorage.setItem("email", event.target.email.value);
        // localStorage.setItem("password", event.target.password.value);
        // console.log("Login button clicked");
        window.location.href = "/products";
    }

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleLogin}>
            <Input type="email" label="Email" placeholder="Masukkan email" name="email" ref={emailRef}/>
            <Input type="password" label="Password" placeholder="Masukkan password" name="password"/>
            <Button classname="w-full bg-amber-700" type="submit">Masuk</Button>
        </form>
    )
}

export default Form;