import BackLanding from "../Components/Layouts/BackLanding";
import { Outlet } from "react-router-dom";
import Form from "../Components/Fragments/FormLogin";

const Login = () => {
    return (
        <BackLanding>
            <Outlet />
        </BackLanding>
    )
}

export default Login;