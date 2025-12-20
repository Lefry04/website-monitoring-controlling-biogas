import Button from "../Elements/Button";
import { useNavigate } from "react-router-dom";

const Verifikasi = () => {

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
        navigate("/login");
    }

    return (
        <div className="bg-black/50 lg:w-2/5 w-9/10 h-fit rounded-2xl p-15 text-start flex flex-col gap-8">
            <h1 className="font-medium text-[28px] text-center">Tautan reset kata sandi telah dikirim ke email, silahkan periksa email anda</h1>
            <p className="w-full text-center text-white font-light">Belum menerima kode? <span className="underline cursor-pointer font-bold"><br />Kirim Ulang</span></p>
            <Button classname="w-full col-login-button py-4 rounded-2xl mb-5" type="submit" onClick={handleLogin}>Konfirmasi</Button>
        </div>
    )
}

export default Verifikasi;