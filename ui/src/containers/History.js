
import { useEffect, useState } from 'react';

import HistoryItem from "../components/HistoryItem"
import Modal from '../components/Modal';
import "./History.css"

async function getHistory() {
    let currentUrl = document.location.href;
    console.log('currentUrl', currentUrl)

    let res = await fetch(`${currentUrl}api/history`);
    // let res = await fetch(`http://localhost:3001/chronicle/api/history`);
    let data = await res.json()
    return data;
}

export default function History() {
    const [history, setHistory] = useState([]);
    const [modalID, setModalID] = useState(null);

    useEffect(async () => {
        let data = await getHistory();
        setHistory(data);
    }, []);

    const onItemClick = (i) => {
        console.log('i', i)
        setModalID(i);
    }

    const resetModal = () => {
        setModalID(null)
    }

    console.log(history)
    return (
        <div className="History">
            {modalID != null && <Modal {...history[modalID]} onClick={resetModal} />}
            {history.map((el, i) => {
                return (
                    <div id={i}>
                        <HistoryItem {...el} onClick={() => onItemClick(i)} />
                    </div>
                );
            })}
        </div>
    );
}
