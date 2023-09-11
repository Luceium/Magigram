import { Button } from "reactstrap";
import WordGroup from "./wordGroup";
import { useSelector, useDispatch } from "react-redux";
import { frequencyToString } from "../util/frequencyUtils";

//alias to import functional react component
export default function History() {
    let history = useSelector(state => state.hist);
    const dispatch = useDispatch();

    function pop(index) {
        let data = index;
        dispatch({type: 'POP', payload: data});
    }
    
    function pull(index) {
        let data = index;
        dispatch({type: 'PULL', payload: data});
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
                history.map((attempt, index) => {
                    return(
                        <div className="flex">
                            <div key={index} onClick={() => pull(index)} className="bg-warning rounded-3 rounded-start-pill p-1 m-1">
                                <WordGroup src={attempt.words} type='history' />
                                <p className="badge badge-pill bg-secondary">{frequencyToString(attempt.letterFrequency)}</p>
                            </div>
                            <Button className="bg-danger rounded-end-circle" onClick={() => pop(index)}>Delete</Button>
                        </div>
                    )
                })
            }
        </>
    );
}