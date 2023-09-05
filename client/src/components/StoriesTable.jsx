import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { formatDate } from '../lib/formatDate';
import { Link } from "react-router-dom";


export function StoriesTable() {
    const { stories } = useContext(GlobalContext);

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [sum, setSum] = useState('');
    const [sumErr, setSumErr] = useState('');
    const [sumValid, setSumValid] = useState(false);

    function updateName(e) {
        setName(e.target.value);
    }

    function updateSum(e) {
        setSum(e.target.value);
    }

    function isValidName() {
        const minNameSize = 2;
        const maxNameSize = 50;

        if (name.length < minNameSize) {
            setNameErr(`Privaloma maziausiai ${minNameSize} simboliai.`);
            setNameValid(false);
        } else if (name.length > maxNameSize) {
            setNameErr(`Leidziama daugiausiai ${maxNameSize} simboliu.`);
            setNameValid(false);
        } else {
            setNameErr(false);
            setNameValid(true);
        }
    }

    function isValidSum() {
        const minSumSize = 1;
        const maxSumSize = 9;

        if (sum.length < minSumSize) {
            setSumErr(`Privaloma maziausiai ${minSumSize} simboliai.`);
            setSumValid(false);
        } else if (sum.length > maxSumSize) {
            setSumErr(`Leidziama daugiausiai ${maxSumSize} simboliu.`);
            setSumValid(false);
        } else {
            setSumErr(false);
            setSumValid(true);
        }
    }

    return (
        <div className="container px-4 py-5" id="featured-3">
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                {stories.map((story) => (
                    <div className="col" key={story.id}>
                        <div className="feature">
                            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                <img src={story.img} alt="Nuotrauka" />
                            </div>
                            <h3 className="fs-2 text-body-emphasis">{story.title}</h3>
                            <p>{story.story}</p>
                            <p>Reikalinga suma: € {story.amount}</p>
                            <p>Jau surinkta: € {story.current_amount}</p>
                            <p>Dar truksta: € {story.left_amount}</p>
                            <p>Patalpinta: {formatDate(story.createdAt)}</p>
                            <h6 className="mt-4">Noretum prisidet?</h6>
                            <div className="form-floating mb-4">
                                <input onChange={updateName} onBlur={isValidName} autoComplete="Off" value={name} type="text" id="name"
                                    className={`form-control ${nameErr ? 'is-invalid' : ''} ${nameValid ? 'is-valid' : ''}`} />
                                <label htmlFor="email">Vardas</label>
                                <div className="invalid-feedback">{nameErr}</div>
                            </div>
                            <div className="form-floating mb-4">
                                <input onChange={updateSum} onBlur={isValidSum} autoComplete="Off" value={sum} type="text" id="sum"
                                    className={`form-control ${sumErr ? 'is-invalid' : ''} ${sumValid ? 'is-valid' : ''}`} />
                                <label htmlFor="email">Suma</label>
                                <div className="invalid-feedback">{sumErr}</div>                              
                            </div>
                            <Link href="/" className="icon-link">
                                Aukoti
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
