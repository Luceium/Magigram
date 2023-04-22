import React, { Component } from 'react';
class History extends Component {
    state = { words: [
                {id: "0", value:"test"}
            ] } 
    render() { 
        return (
        <div>
            {this.state.words.map(word => <h2 key={word.id}>{word.value}</h2>)}
        </div>
    );}
}
 
export default History;