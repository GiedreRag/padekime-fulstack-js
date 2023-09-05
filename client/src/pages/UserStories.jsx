// import { StoriesTable } from "../components/StoriesTable";
// import { GlobalContext } from "../context/GlobalContext";
// import { useContext, useState } from "react";

// export function UserStories() {
//     const { stories } = useContext(GlobalContext);
//     const [selectedStory, setSelectedStory] = useState('Visos');
//     const [title, setTitle] = useState('');

//     return (
//         <div className="container">
//             <div className="row">
//                 <h1 className="col-12 display-1 text-center">Vartotojas</h1>
//                 <div className="col-12">
//                     <div className="row">
//                         <div className="col-6 col-sm-4 col-md-3">
//                             <select className=" form-select"
//                                 onChange={e => setSelectedStory(e.target.value)}>
//                                 <option value="All">All</option>
//                                 {stories.map(ct => (
//                                     <option key={ct} value={ct}>{ct}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="col-6 col-sm-4 col-md-3">
//                             <input type="text" className="form-control" value={title}
//                                 onChange={e => setTitle(e.target.value)} />
//                         </div>

//                     </div>
//                 </div>
//                 <div className="col-12">
//                     <StoriesTable filterStory={selectedStory} filterTitle={title.toLowerCase()} />
//                 </div>
//             </div>
//         </div>
//     )
// }