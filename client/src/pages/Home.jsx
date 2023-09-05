import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { StoriesTable } from '../components/StoriesTable';

export function Home() {
    const { stories } = useContext(GlobalContext);
    return (
        <div className="container px-4 py-5" id="hanging-icons">
            <h2 className="pb-2 border-bottom">Istorijos</h2>
            <StoriesTable stories={stories} />
        </div>
    );
}