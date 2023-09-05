import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { AdminStories } from './AdminStories';
import { UserStories } from './UserStories';
import { NotAllowed } from '../components/NotAllowed';


export function Stories() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminStories />;
    }

    if (role === 'user') {
        return <UserStories />;
    }

    return <NotAllowed />;
}