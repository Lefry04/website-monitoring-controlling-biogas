import Form from "../Components/Fragments/FormRegister";
import AuthLayouts from "../Components/Layouts/AuthLayouts";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <AuthLayouts title="Daftar" type="register">
            <Form />
        </AuthLayouts>
    )
}

export default Register;