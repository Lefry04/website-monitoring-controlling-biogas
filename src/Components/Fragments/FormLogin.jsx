import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Form = () => {

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        // localStorage.setItem("email", event.target.email.value);
        // localStorage.setItem("password", event.target.password.value);
        // console.log("Login button clicked");
        window.location.href = "/dashboard";
    }

    return (
        <div className="bg-black/50 lg:w-2/5 w-9/10 h-fit rounded-2xl p-15 text-start flex flex-col gap-8">
            <h1 className="font-medium text-[28px]">Siap mengelola energi cerdas? <br />Masuk sekarang!</h1>
            <form onSubmit={handleLogin}>
                <Input type="email" label="Email" placeholder="Masukkan email anda" name="email" className="border border-white lg:text-lg text-sm text-white" ukuran="mb-7" ref={emailRef} />
                <Input type="password" label="Kata Sandi" placeholder="Masukkan kata sandi anda" name="password" className="border border-white lg:text-lg text-sm text-white" />
                <p className="w-full text-end text-white/75 underline mb-6 font-light cursor-pointer"><Link to="/login/password">Lupa kata sandi?</Link></p>
                <Button classname="w-full col-login-button py-4 rounded-2xl" type="submit">Masuk</Button>
            </form>
            <p className="w-full text-end text-white font-light mt-4">Belum memiliki akun? <span className="underline cursor-pointer font-bold"><Link to="/daftar">Daftar</Link></span></p>
        </div>
    )
}

export default Form;