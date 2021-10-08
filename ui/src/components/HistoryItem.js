
import "./HistoryItem.css"

export default function HistoryItem(props) {
    return (
        <div className="HistoryItem" onClick={props.onClick}>
            <div className="HistoryRow">
                <span>{props.request.url}</span>
                <span>{props.response.status.code}</span>
            </div>
            <div className="HistoryRow">
                <span>{(new Date(props.timestamp)).toLocaleString()}</span>
            </div>
            <div className="HistoryRow">
                <span>{props.elapsed} ms</span>
            </div>
        </div>
    )
}
