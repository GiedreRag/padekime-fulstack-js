import { Link } from "react-router-dom";

export function AdminAccount() {
    return (
        <div className="container" >
            <h1>Sveiki admin!</h1>

            <ul className="col-12 col-md-auto mb-2 justify-content-center mt-4">
                <li><Link to="/koreguoti-forma" className="nav-link px-2">Koreguoti forma</Link></li>
            </ul>
        </div>
    );
}