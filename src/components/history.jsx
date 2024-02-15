import WordGroup from "./wordGroup";
import { useSelector, useDispatch } from "react-redux";
import { frequencyToString, isEmpty } from "../util/frequencyUtils";

//alias to import functional react component
export default function History() {
    let history = useSelector(state => state.hist);
    let letterFrequency = useSelector(state => state.letterFrequency);
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
        if (isEmpty(letterFrequency)) return;
        dispatch({type: 'PUSH'});
    }

    return (
        <div className="mt-3 p-2 flex-1 bg-neutral text-neutral-content rounded">
            <div className="flex items-center">
                <h1>History</h1>
                <div className="flex-1"/>
                <button className="btn" onClick={push}>Save</button>
            </div>
            {
                history.map((attempt, index) => {
                    return(
                        <div className="flex join m-3">
                            <div key={index} onClick={() => pull(index)} className="join-item p-1 bg-base-100">
                                <WordGroup src={attempt.words} type='history' />
                                <p className="badge badge-pill bg-secondary text-secondary-content">{frequencyToString(attempt.letterFrequency)}</p>
                            </div>
                            <button className="bg-error text-error-content join-item p-1" onClick={() => pop(index)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    );
}