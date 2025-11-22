import BackLanding from "../Components/Layouts/BackLanding";
import Button from "../Components/Elements/Button";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <BackLanding>
            <h1 className="text-4xl font-extrabold text-white w-7/10">Pantau produksi, konsumsi, dan efisiensi biogas secara real-time melalui dashboard interaktif</h1>
            <i className="text-2xl font-light">Daftar untuk mulai memantau biogas Anda</i>
            <Link to="/daftar" className="block w-40 h-3/50 ">
                <Button classname="col-button w-full h-full rounded-xl cursor-pointer" type="submit" >
                    Daftar
                </Button>
            </Link>
        </BackLanding>
    )
}

export default Landing;