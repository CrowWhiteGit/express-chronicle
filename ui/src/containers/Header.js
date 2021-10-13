
import { useEffect, useState } from 'react';
import "./Header.css"

export default function Header({ pages, onClick }) {

    return (
        <div className="Header">
            <button className="header-button" onClick={() => onClick('history')}>common</button>
            <button className="header-button" onClick={() => onClick('important')}>important</button>
        </div>
    );
}
