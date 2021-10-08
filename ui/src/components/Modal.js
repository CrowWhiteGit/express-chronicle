
import './Modal.css'

export default function Modal(props) {
    return (
        <div className="ModalBG">
            <div className="ModalContainer">
                <button onClick={props.onClick}>X</button>
                <p>Time: {(new Date(props.timestamp)).toLocaleString()}</p>
                <p>Elapsed: {props.elapsed}ms</p>
                <p>Request:</p>
                <div className="Box">
                    <p>Method: {props.request.method}</p>
                    <p>Url: {props.request.url}</p>
                    <p>Query: <pre>{JSON.stringify(props.request.query)}</pre></p>
                    <p>Body: <pre>{JSON.stringify(props.request.body)}</pre></p>
                </div>
                <span>Response:</span>
                <div className="Box">
                    <p>Status: {props.response.status.code} {props.response.status.message}</p>
                    <p>Body: <pre>{JSON.stringify(props.response.body)}</pre></p>
                </div>
            </div>
        </div>
    )
}
