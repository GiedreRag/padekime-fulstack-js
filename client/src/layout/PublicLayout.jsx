import { Outlet } from "react-router-dom";

export function PublicLayout() {
    return (
        <>
            <header>HEADER</header>
            <Outlet />
            <footer>FOOTER</footer>
        </>
    );
}