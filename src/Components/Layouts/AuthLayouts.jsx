import Form from "../Fragments/FormLogin_bel";
import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
    const { title, children, type } = props;
    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className="max-w-sm w-full">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="font-medium text-slate-400 mb-3">Hai, isi data dirimu.</p>
                {children}
                <p className="mt-4 justify-center flex">
                    {type === "login" ? "Belum punya akun?" : "Sudah punya akun?"}

                    {type === "login" && (
                        <Link to="/register" className="ml-1 text-amber-700">Daftar</Link>
                    )}
                    <TesRegister type={type} />
                </p>
            </div>
        </div>
    )
}

const TesRegister = ({ type }) => {
    if (type === "register") {
        return (
            <Link to="/login" className="ml-1 text-amber-700">Masuk</Link>
        )
    }
}

export default AuthLayouts;