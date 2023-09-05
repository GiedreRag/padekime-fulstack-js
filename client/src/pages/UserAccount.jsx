import { Link } from "react-router-dom";

export function UserAccount() {
    return (
        <div className="container" >
            <h1>Sveiki!</h1>
            <div>
                <Link to='/sukurti-nauja-istorija'>Sukurti nauja istorija</Link>
            </div>
            <div className="col-12">
                {/* <StoriesTable /> */}
            </div>
        </div>
    );
}