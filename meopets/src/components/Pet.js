import {useNavigate, useParams} from "react-router-dom";

export default function Pet(){
    let navigate = useNavigate();
    let params = useParams();
    function navToGame(){
        navigate("/Minigame")
    }
    return (
        <>
            <h2>{params.petId}</h2> {/* Grab name of pet that matches URL param */}
            {/* TODO: Match image to species of pet */}
            <p>Image of pet goes here</p>

            {/* TODO: Decrement pet's hunger state */}
            <button onClick={navToGame}>Feed me!</button>
            {/* TODO: Increment pet's happiness state */}
            <button>Play with me!</button>

            <br/><br/>

            {/* Clicking on the button navigates the user back to UserProfile */}
            <button onClick={() => {
                navigate("/userprofile")
            }}>
                Go back
            </button>
        </>
    );
}