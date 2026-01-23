import Navigasi from "../Elements/Navigasi";
import beranda from "../../assets/beranda.svg";
import analitik from "../../assets/analitik.svg";
import produksi from "../../assets/produksi.svg";
import pengaduk from "../../assets/pengaduk.svg";
import notifikasi from "../../assets/notifikasi.svg";
import profil from "../../assets/profilnav.svg";
import keluar from "../../assets/keluar.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

const NavigasiBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Gagal logout:", error);
        }
    };

    const navItems = [
        { label: "Beranda", src: beranda, path: "/dashboard" },
        { label: "Analitik", src: analitik, path: "/analitik" },
        { label: "Produksi", src: produksi, path: "/produksi" },
        { label: "Pengaduk", src: pengaduk, path: "/pengaduk" },
        { label: "Notifikasi", src: notifikasi, path: "/notifikasi" },
        { label: "Profil", src: profil, path: "/profil" },
    ];

    return (
        <div className="fixed left-0 top-1/13 w-1/10 justify-center flex flex-col gap-23">
            <div className="flex flex-col gap-10">
                {navItems.map((item) => (
                    <Navigasi
                        key={item.label}
                        children={item.label}
                        src={item.src}
                        active={location.pathname === item.path}
                        path={item.path}
                    />
                ))}
            </div>
            <div onClick={handleLogout} className="cursor-pointer">
                <Navigasi children="Keluar" src={keluar} />
            </div>

        </div>
    )
}

export default NavigasiBar;