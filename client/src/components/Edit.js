import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DataService from '../services/service';
import Loading from './Loading';
import './Create.css';

export default function Edit(props) {

    const [school, setSchool] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const history = useHistory();

    useEffect(() => {
        DataService.school(props.match.params.id)
            .then(res => setSchool(res.data))
            .catch(err => console.log(err));
    }, [props.match.params.id]);

    const onChangeFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const onChangeForm = (e) => {
        const newForm = {...school};
        newForm[e.target.name] = e.target.value;
        setSchool(newForm);
    }

    const changeSubmission = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if(file) {
                const data = new FormData();
                data.append("submissionImage", file, file.name);

                DataService.imgUpload(data, {
                    headers: {
                        "accept": "application/json",
                        "Accept-Language": "en-US,en;q=0.8",
                        "Content-Type": `multipart/form-data; boundary=${data._boundary}`
                    }
                })
                .then((res) => {
                    const formData = {...school};
                    formData.image=res.data.location;
                    console.log(formData);

                    DataService.edit(formData)
                        .then(res => console.log(res))
                        .catch(err => console.error(err));

                    setLoading(false);
                    history.push('/school/'+school._id);
                })
                .catch(err => console.log(err));
            } else {
                DataService.edit(school)
                    .then(res => console.log(res))
                    .catch(err => console.error(err));

                setLoading(false);
                history.push('/school/'+school._id);
            }
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
                    <div className="image inputGroup">
                        <label htmlFor="image">Image (gif, jpeg, jpg, png):</label>
                        <input id="image" type="file" onChange={onChangeFile}></input>
                    </div>
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
                    <button type="submit" style={{width: "200px"}}>Save Changes</button>
                </fieldset>
            </form>
            )}
        </div>
    )
}
