import { Link } from "react-router-dom";

export function HomePage(){
    return (
        <>
            <button><Link to="/game"></Link>Game</button>
        </>
    )
}