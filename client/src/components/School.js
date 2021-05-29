import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataService from '../services/service';
import Aos from "aos";
import "aos/dist/aos.css";
import './School.css';

export default function School() {

    const { id } = useParams();
    const [school, setSchool] = useState(undefined);

    useEffect(() => {
        Aos.init({});

        DataService.school(id)
        .then(res => setSchool(res.data))
        .catch(err => console.log(err))
    }, []);

    return (
        <div>
            { school && (
                <div className="School">
                    <img src={school.image} alt={school.name}/>
                    <div className="information">
                        <h1 data-aos="fade-left">Welcome to {school.name}!</h1>
                        <h2>About us</h2>
                        <p>{school.about}</p>
                        <h2>Location</h2>
                        <p>{school.location}</p>
                        <h2>Admission</h2>
                        <p>{school.admission}</p>
                        <Link to={`/edit/${school._id}`}>Edit</Link>
                    </div>
                </div>
            )}
        </div>
    )
}
