import DataService from '../services/service';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loading from './Loading';
import './Home.css';

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [schools, setSchools] = useState([]);
    const history = useHistory();

    useEffect(() => {
        DataService.schools()
        .then((res) => {
            setSchools(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    const create = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            history.push('/create')
        }, 2500);
    };

    return (
        <div className="Home">
            {
                loading===true && <Loading />
            }
            { !schools && (<p>No schools create yet. Create one <Link to="/create">here</Link></p>)}
            { schools && (
                <>
                    <button onClick={create}>Create</button>
                    <div className="break"></div>
                    <table>
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Admission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools && schools.map((school) => (
                                <tr key={school._id} onClick={() => history.push(`/school/${school._id}`)}>
                                    <td><img src={school.image} alt="School" /></td>
                                    <td>{school.name}</td>
                                    <td>{school.about}</td>
                                    <td>{school.location}</td>
                                    <td>{school.admission}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}
