// import Button from "../Elements/Button";
// import { useNavigate } from "react-router-dom";

// const Verifikasi = () => {

//     // const emailRef = useRef(null);

//     // useEffect(() => {
//     //     emailRef.current.focus();
//     // }, []);

//     const navigate = useNavigate();

//     const handleLogin = (event) => {
//         event.preventDefault();
//         // localStorage.setItem("email", event.target.email.value);
//         // localStorage.setItem("password", event.target.password.value);
//         // console.log("Login button clicked");
//         navigate("/login");
//     }

//     return (
//         <div className="bg-black/50 lg:w-2/5 w-9/10 h-fit rounded-2xl p-15 text-start flex flex-col gap-8">
//             <h1 className="font-medium lg:text-[28px] text-2xl text-center">Verifikasi akun anda melalui email yang didaftarkan untuk melanjutkan proses pendaftaran akun anda</h1>
//             <p className="w-full text-center text-white font-light">Belum menerima kode? <span className="underline cursor-pointer font-bold"><br />Kirim Ulang</span></p>
//             <Button classname="w-full col-login-button py-4 rounded-2xl mb-5" type="submit" onClick={handleLogin}>Konfirmasi</Button>
//         </div>
//     )
// }

// export default Verifikasi;

import Button from "../Elements/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import { useAuth } from "../../services/AuthContext";

const Verifikasi = () => {
    const navigate = useNavigate();
    const { resendVerification } = useAuth();

    const [timeLeft, setTimeLeft] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ⏱ Countdown 1 menit
    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // 🔁 Kirim ulang email
    const handleResend = async () => {
        try {
            setLoading(true);
            await resendVerification();
            setTimeLeft(60);
        } catch (err) {
            setError("Gagal mengirim ulang email verifikasi");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Konfirmasi verifikasi
    const handleConfirm = (event) => {
        // setLoading(true);
        // setError("");

        // try {
        //     await auth.currentUser.reload();

        //     if (!auth.currentUser.emailVerified) {
        //         setError("Email belum diverifikasi. Silakan cek inbox Anda.");
        //         return;
        //     }

        //     navigate("/login"); // atau dashboard
        // } catch (err) {
        //     setError("Terjadi kesalahan saat mengecek verifikasi");
        // } finally {
        //     setLoading(false);
        // }
        event.preventDefault();
//         // localStorage.setItem("email", event.target.email.value);
//         // localStorage.setItem("password", event.target.password.value);
//         // console.log("Login button clicked");
        navigate("/login");
    };

    return (
        <div className="bg-black/50 lg:w-2/5 w-9/10 h-fit rounded-2xl p-15 text-start flex flex-col gap-8">
            <h1 className="font-medium lg:text-[28px] text-2xl text-center">
                Verifikasi akun Anda melalui email yang didaftarkan untuk melanjutkan
            </h1>

            {error && (
                <p className="text-center text-red-500 text-sm">
                    {error}
                </p>
            )}

            <p className="w-full text-center text-white font-light">
                Belum menerima email?
                <br />
                {timeLeft > 0 ? (
                    <span className="opacity-50">
                        Kirim ulang dalam {timeLeft} detik
                    </span>
                ) : (
                    <span
                        className="underline cursor-pointer font-bold"
                        onClick={handleResend}
                    >
                        Kirim Ulang
                    </span>
                )}
            </p>

            <Button
                classname="w-full col-login-button py-4 rounded-2xl mb-5"
                type="button"
                onClick={handleConfirm}
                disabled={loading}
            >
                {loading ? "Memproses..." : "Konfirmasi"}
            </Button>
        </div>
    );
};

export default Verifikasi;
