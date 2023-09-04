import { useContext } from "react";
import { AdminAccount } from "./AdminAccount";
import { UserAccount } from "./UserAccount";
import { GlobalContext } from "../context/GlobalContext";
import { Login } from "./Login";

export function Account() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminAccount />;
    }

    if (role === 'user') {
        return <UserAccount />;
    }

    return <Login />;

}