import React, { Component } from 'react';
import  '../header/header.css';

export default class Header extends Component {
    render() {
        return (
            <div className = "header">
                <p style={{fontFamily:'monospace', fontStyle:'bold', fontSize:25}}>Welcome</p>
            </div>
        )
    }
}
