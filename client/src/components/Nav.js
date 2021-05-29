import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    return (
        <div className="Nav">
            <Link to="/"><h2 className="title">Project KCANE</h2></Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create</Link></li>
            </ul>
        </div>
    )
}
