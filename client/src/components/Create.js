import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
import DataService from '../services/service';
import './Create.css';

export default function Create() {

    const [form, setForm] = useState({});
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onChangeFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const submitForm = (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            if(!file) {
                setError("Please include an image");
            } else {
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
                    const formData = {
                        image: res.data.location,
                        name: form.name,
                        about: form.about,
                        location: form.location,
                        admission: form.admission
                    };

                    DataService.create(formData)
                        .then(res => console.log(res))
                        .catch(err => console.error(err));
                })
                .catch((err) => {
                    console.error(err);
                });
            }
            setLoading(false);
            history.push('/');
        }, 2500);
    }

    return (
        <div className="Create">
            {
                loading===true && <Loading />
            }
            <form onSubmit={submitForm}>
                <fieldset>
                    <legend>Add a school</legend>
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
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="text inputGroup">
                        <label htmlFor="about">About:</label>
                        <textarea
                            id="about"
                            name="about"
                            rows="10"
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="text inputGroup">
                        <label htmlFor="location">Location:</label>
                        <textarea
                            id="location"
                            name="location"
                            rows="10"
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="text inputGroup">
                        <label htmlFor="admission">Admission:</label>
                        <textarea
                            id="admission"
                            name="admission"
                            rows="10"
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className="break"></div>
                    <button type="submit">submit</button>
                </fieldset>
            </form>
            <p>{error}</p>
        </div>
    )
}
