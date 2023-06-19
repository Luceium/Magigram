import { Button } from "reactstrap";
import WordGroup from "./wordGroup";
import { useSelector, useDispatch } from "react-redux";
import { frequencyToString } from "../util/util";

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
                            <div key={index} onClick={() => pull(index)}>
                                <WordGroup src={attempt.words} type='history' className='bg-warning'/>
                                <p className="badge badge-pill bg-secondary">{frequencyToString(attempt.letterFrequency)}</p>
                            </div>
                            <Button className="danger" onClick={() => pop(index)}>Delete</Button>
                        </div>
                    )
                })
            }
        </>
    );
}