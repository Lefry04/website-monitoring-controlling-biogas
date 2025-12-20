import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { useNavigate } from "react-router-dom";

const LupaPass = () => {

    // const emailRef = useRef(null);

    // useEffect(() => {
    //     emailRef.current.focus();
    // }, []);

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // localStorage.setItem("email", event.target.email.value);
        // localStorage.setItem("password", event.target.password.value);
        // console.log("Login button clicked");
        navigate("/login/verifikasi");
    }

    return (
        <div className="bg-black/50 lg:w-2/5 w-9/10 h-fit rounded-2xl p-15 text-start flex flex-col gap-8">
            <h1 className="font-medium text-[28px]">Lupa kata sandi? Silahkan isi email yang terdaftar</h1>
            <form onSubmit={handleLogin}>
                <Input type="email" label="Email" placeholder="Masukkan email anda" name="email" className="border border-white lg:text-lg text-sm text-white" ukuran="mb-7" />
                <p className="w-full text-end text-white/75 underline mb-6 font-light cursor-pointer"></p>
                <Button classname="w-full col-login-button py-4 rounded-2xl" type="submit">Kirim</Button>
            </form>
        </div>
    )
}

export default LupaPass;