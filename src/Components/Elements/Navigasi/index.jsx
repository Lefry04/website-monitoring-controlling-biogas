import { Link } from "react-router-dom";

const Navigasi = (props) => {

    const { src, children, active, path } = props;

    return (
        <a href={path} className={`flex items-center flex-col opacity-50 text-base gap-1 cursor-pointer
        ${
            active 
            ? "opacity-100"
            : "hover:opacity-100"
        }
        `}>
            <img src={src} alt="beranda" className="drag-none"/>
            <h1>{children}</h1>
        </a>
    )
}

export default Navigasi;