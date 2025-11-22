import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex justify-center min-h-screen items-center flex-col">
            <h1 className="font-bold text-5xl">Error</h1>
            <p>Terjadi kesalahan dalam mengakses website</p>
            <p>{error.statustext || error.massage}</p>
        </div>
    )
}

export default ErrorPage;