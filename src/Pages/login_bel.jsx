import Form from "../Components/Fragments/FormLogin_bel";
import AuthLayouts from "../Components/Layouts/AuthLayouts";

const Login = () => {
    return (
        <AuthLayouts title="Masuk" type="login">
            <Form />
        </AuthLayouts>
    )
}


export default Login;