import { Button } from "reactstrap";
import WordGroup from "./wordGroup";
import { useSelector, useDispatch } from "react-redux";

//alias to import functional react component
export default function History() {
    let history = useSelector(state => state.hist);
    const dispatch = useDispatch();

    function pop(index) {
        let data = index;
        dispatch({type: 'POP', payload: data});
    }


    function push() {
        dispatch({type: 'PUSH'});
    }

    return (
        <>
            <div>
                <h1>History</h1>
                <Button onClick={push}>Save</Button>
            </div>
            {
                history.map((attempt, i=0) => {
                    return(
                        <WordGroup key={i++} onClick={(e) => pop(e.target.key)} src={attempt.words} type='history'/>
                    )
                })
            }
        </>
    );
}