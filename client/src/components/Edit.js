import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DataService from '../services/service';
import Loading from './Loading';
import './Create.css';

export default function Edit() {

    const { id } = useParams();
    const [school, setSchool] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        DataService.school(id)
            .then(res => setSchool(res.data))
            .catch(err => console.log(err));
    }, []);

    const onChangeForm = (e) => {
        const newForm = {...school};
        newForm[e.target.name] = e.target.value;
        setSchool(newForm)
    }

    const changeSubmission = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const formData = {
                image: school.image,
                name: school.name,
                about: school.about,
                location: school.location,
                admission: school.admission
            };

            DataService.create(formData)
                .then(res => console.log(res))
                .catch(err => console.error(err));

            setLoading(false);
            history.push('/school/'+school._id);
        }, 2500);
    }

    return (
        <div className="Edit">
            {
                loading===true && <Loading />
            }
            { school && (
                <form onSubmit={changeSubmission}>
                <fieldset>
                    <legend>Edit Information</legend>
                    <div className="text inputGroup">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={school.name}
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="text inputGroup">
                        <label htmlFor="about">About:</label>
                        <textarea
                            id="about"
                            name="about"
                            rows="10"
                            value={school.about}
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="text inputGroup">
                        <label htmlFor="location">Location:</label>
                        <textarea
                            id="location"
                            name="location"
                            rows="10"
                            value={school.location}
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="text inputGroup">
                        <label htmlFor="admission">Admission:</label>
                        <textarea
                            id="admission"
                            name="admission"
                            rows="10"
                            value={school.admission}
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="break"></div>
                    <button type="submit">submit</button>
                </fieldset>
            </form>
            )}
        </div>
    )
}
