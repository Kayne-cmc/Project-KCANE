import React from 'react';
import './Loading.css';
import Dreamschools from '../images/Dreamschools.png';

export default function Loading() {
    return (
        <div className="Loading">
            <h2>
                <span><img src={Dreamschools} alt="logo"/></span>
                <span>D</span>
                <span>R</span>
                <span>E</span>
                <span>A</span>
                <span>M</span>
                <span>S</span>
                <span>C</span>
                <span>H</span>
                <span>O</span>
                <span>O</span>
                <span>L</span>
                <span>S</span>
            </h2>   
        </div>
    )
}
