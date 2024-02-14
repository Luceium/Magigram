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
        <div className="mt-3 p-2 flex-1 bg-neutral text-neutral-content rounded">
            <div className="flex items-center">
                <h1>History</h1>
                <div className="flex-1"/>
                <button className="btn" onClick={push}>Save</button>
            </div>
            {
                history.map((attempt, index) => {
                    return(
                        <div className="flex join">
                            <div key={index} onClick={() => pull(index)} className="bg-base text-base-content join-item p-1 m-1">
                                <WordGroup src={attempt.words} type='history' />
                                {/* Write a method to check that the map has 0's only */}
                                {attempt.letterFrequency.isEmpty() > 0 ? <p className="badge badge-pill bg-secondary">{frequencyToString(attempt.letterFrequency)}</p> : ""}
                            </div>
                            <button className="bg-error join-item" onClick={() => pop(index)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    );
}