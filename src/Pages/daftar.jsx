import BackLanding from "../Components/Layouts/BackLanding";
import Form from "../Components/Fragments/FormDaftar";
import { Outlet } from "react-router-dom";

const Daftar = () => {
    return (
        <BackLanding>
            <Outlet />
        </BackLanding>
    )
}

export default Daftar;